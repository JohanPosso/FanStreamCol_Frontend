import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";

export default function ProductsDemo() {
  let emptyProduct = {
    name: "",
    lastname: "",
    email: "",
    password: "",
  };

  const [products, setProducts] = useState([]);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${apiUrl}/todo`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudieron cargar los productos",
        life: 3000,
      });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [apiUrl]);

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const saveProduct = async () => {
    setSubmitted(true);
    if (
      product.name.trim() &&
      product.lastname.trim() &&
      product.email.trim() &&
      (!product.id ? product.password.trim() : true) // Validar contraseña solo si se está creando un nuevo usuario
    ) {
      try {
        let response;
        if (product.id) {
          response = await updateProduct(product);
        } else {
          response = await createProduct(product);
        }

        const data = await response.json();
        setProducts((prevProducts) => {
          if (product.id) {
            return prevProducts.map((p) =>
              p.id === product.id ? data.user : p
            );
          } else {
            return [...prevProducts, data.user];
          }
        });

        setProductDialog(false);
        setProduct(emptyProduct);

        // Refrescar la lista de productos
        await fetchProducts(); // Llama a la función para recargar los productos
      } catch (error) {
        console.error("Error guardando el usuario:", error);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "No se pudo guardar el usuario",
          life: 3000,
        });
      }
    }
  };

  const createProduct = async (newProduct) => {
    return await fetch(`${apiUrl}/crear`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
  };

  const updateProduct = async (updatedProduct) => {
    return await fetch(`${apiUrl}/update/${updatedProduct.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    });
  };

  const editProduct = (product) => {
    setProduct({ ...product });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product) => {
    if (product && product.id) {
      setProduct(product);
      setDeleteProductDialog(true);
    } else {
      console.error("No product ID found for deletion.");
    }
  };

  const deleteProduct = async () => {
    if (product && product.id) {
      try {
        await fetch(`${apiUrl}/delete/${product.id}`, {
          method: "DELETE",
        });

        const _products = products.filter((val) => val.id !== product.id);
        setProducts(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);

        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Deleted",
          life: 3000,
        });

        // Refrescar la lista de productos
        await fetchProducts(); // Llama a la función para recargar los productos
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "No se pudo eliminar el producto",
          life: 3000,
        });
      }
    } else {
      console.error("No product ID found for deletion.");
    }
  };

  const confirmDeleteSelected = () => {
    if (selectedProducts && selectedProducts.length) {
      setProduct(selectedProducts[0]); // Puedes ajustar esto para manejar múltiples selecciones si es necesario
      setDeleteProductDialog(true);
    } else {
      console.error("No products selected for deletion.");
    }
  };

  const leftToolbarTemplate = () => (
    <div className="flex flex-wrap gap-2">
      <Button
        label="New"
        icon="pi pi-plus"
        severity="success"
        onClick={openNew}
      />
      <Button
        label="Delete"
        icon="pi pi-trash"
        severity="danger"
        onClick={confirmDeleteSelected}
        disabled={!selectedProducts || !selectedProducts.length}
      />
    </div>
  );

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Usuarios ({products.length})</h4>
      <InputText
        type="search"
        onInput={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex justify-content-center">
        <Button
          icon="pi pi-pencil"
          className="p-button-warning mr-2"
          onClick={() => editProduct(rowData)}
          tooltip="Edit"
          tooltipOptions={{ position: "top" }}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={() => confirmDeleteProduct(rowData)}
          tooltip="Delete"
          tooltipOptions={{ position: "top" }}
        />
      </div>
    );
  };

  const getRoleName = (roleId) => {
    const roles = {
      1: "Administrador",
      2: "Usuario",
      3: "Moderador",
    };
    return roles[roleId] || "Desconocido";
  };

  return (
    <div>
      <Toast ref={toast} />
      <div className="card">
        <Toolbar className="mb-4" left={leftToolbarTemplate} />
        <DataTable
          value={products}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          dataKey="id"
          paginator
          rows={10}
          globalFilter={globalFilter}
          header={header}
        >
          <Column selectionMode="multiple" exportable={false}></Column>
          <Column field="name" header="Name" sortable></Column>
          <Column field="lastname" header="Last Name" sortable></Column>
          <Column field="email" header="Email" sortable></Column>
          <Column field="createdAt" header="Created At" sortable></Column>
          <Column field="updatedAt" header="Updated At" sortable></Column>
          <Column
            field="RoleIdRole"
            header="Role"
            body={(rowData) => getRoleName(rowData?.RoleIdRole)}
            sortable
          />
          <Column
            header="Actions"
            body={actionBodyTemplate}
            exportable={false}
          ></Column>
        </DataTable>
      </div>

      {/* Modal de crear/editar */}
      <Dialog
        visible={productDialog}
        style={{ width: "450px" }}
        header={product.id ? "Editar Usuario" : "Crear Usuario"}
        modal
        footer={
          <>
            <Button
              label="Cancelar"
              icon="pi pi-times"
              className="p-button-text"
              onClick={hideDialog}
            />
            <Button
              label="Guardar"
              icon="pi pi-check"
              className="p-button-text"
              onClick={saveProduct}
            />
          </>
        }
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="name">Nombre</label>
          <InputText
            id="name"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            required
            className={classNames({ "p-invalid": submitted && !product.name })}
          />
          {submitted && !product.name && (
            <small className="p-error">El nombre es requerido.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="lastname">Apellido</label>
          <InputText
            id="lastname"
            value={product.lastname}
            onChange={(e) =>
              setProduct({ ...product, lastname: e.target.value })
            }
            required
            className={classNames({
              "p-invalid": submitted && !product.lastname,
            })}
          />
          {submitted && !product.lastname && (
            <small className="p-error">El apellido es requerido.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="email">Correo electrónico</label>
          <InputText
            id="email"
            value={product.email}
            onChange={(e) => setProduct({ ...product, email: e.target.value })}
            required
            className={classNames({ "p-invalid": submitted && !product.email })}
          />
          {submitted && !product.email && (
            <small className="p-error">
              El correo electrónico es requerido.
            </small>
          )}
        </div>
        {!product.id && ( // Solo mostrar este campo si se está creando un nuevo usuario
          <div className="field">
            <label htmlFor="password">Contraseña</label>
            <InputText
              id="password"
              value={product.password}
              onChange={(e) =>
                setProduct({ ...product, password: e.target.value })
              }
              required
              type="password"
              className={classNames({
                "p-invalid": submitted && !product.password,
              })}
            />
            {submitted && !product.password && (
              <small className="p-error">La contraseña es requerida.</small>
            )}
          </div>
        )}
      </Dialog>

      {/* Modal de confirmación de eliminación */}
      <Dialog
        visible={deleteProductDialog}
        style={{ width: "450px" }}
        header="Confirmar"
        modal
        footer={
          <>
            <Button
              label="Cancelar"
              icon="pi pi-times"
              className="p-button-text"
              onClick={() => setDeleteProductDialog(false)}
            />
            <Button
              label="Confirmar"
              icon="pi pi-check"
              className="p-button-text"
              onClick={deleteProduct}
            />
          </>
        }
        onHide={() => setDeleteProductDialog(false)}
      >
        <div className="flex align-items-center justify-content-center">
          ¿Estás seguro de que quieres eliminar este usuario?
        </div>
      </Dialog>
    </div>
  );
}
