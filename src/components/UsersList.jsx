import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";

export default function ProductsDemo() {
  let emptyProduct = {
    id: null,
    name: "",
    lastname: "",
    email: "",
    password: "",
    createdAt: "",
    updatedAt: "",
    RoleIdRole: null,
  };

  const [products, setProducts] = useState([]);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL; // Cambiar a la ruta correcta de tu API

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}/todo`);
        const data = await response.json();
        setProducts(data); // Establecer los productos en el estado
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

    fetchProducts();
  }, [apiUrl]);

  const getRoleName = (roleId) => {
    switch (roleId) {
      case 1:
        return "Admin";
      case 2:
        return "User";
      case 3:
        return "Invited";
      default:
        return "Unknown";
    }
  };

  const openNew = () => {
    navigate("/upload-modelo");
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const saveProduct = () => {
    setSubmitted(true);

    if (
      product.name.trim() &&
      product.lastname.trim() &&
      product.email.trim()
    ) {
      let _products = [...products];
      let _product = { ...product };

      if (product.id) {
        const index = findIndexById(product.id);
        _products[index] = _product;
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Updated",
          life: 3000,
        });
      } else {
        _product.id = createId();
        _products.push(_product);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Created",
          life: 3000,
        });
      }

      setProducts(_products);
      setProductDialog(false);
      setProduct(emptyProduct);
    }
  };

  const editProduct = (product) => {
    setProduct({ ...product });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product) => {
    if (product && product.id) {
      setProduct(product); // Asegúrate de que 'product' tenga un ID válido
      setDeleteProductDialog(true); // Muestra el diálogo de confirmación
    } else {
      console.error("No product ID found for deletion."); // Mensaje de error si no hay ID
    }
  };

  const deleteProduct = async () => {
    if (product && product.id) {
      console.log(`Deleting product with ID: ${product.id}`); // Imprime el ID para verificar
      try {
        await fetch(`${apiUrl}/delete/${product.id}`, {
          method: "DELETE",
        });

        // Filtra el producto eliminado
        let _products = products.filter((val) => val.id !== product.id);
        setProducts(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);

        // Muestra un mensaje de éxito
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Deleted",
          life: 3000,
        });
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
      console.error("No product ID found for deletion."); // Mensaje de error si no hay ID
    }
  };

  const findIndexById = (id) => {
    let index = -1;

    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const createId = () => {
    let id = "";
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return id;
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const deleteSelectedProducts = async () => {
    try {
      await Promise.all(
        selectedProducts.map(async (selectedProduct) => {
          await fetch(`${apiUrl}/delete/${selectedProduct.id}`, {
            method: "DELETE",
          });
        })
      );

      let _products = products.filter((val) => !selectedProducts.includes(val));
      setProducts(_products);
      setDeleteProductsDialog(false);
      setSelectedProducts(null);
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Products Deleted",
        life: 3000,
      });
    } catch (error) {
      console.error("Error deleting selected products:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudieron eliminar los productos seleccionados",
        life: 3000,
      });
    }
  };

  const leftToolbarTemplate = () => {
    return (
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
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Usuarios</h4>
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
          className="p-button-warning"
          onClick={() => editProduct(rowData)}
          tooltip="Edit"
          tooltipOptions={{ position: "top" }}
        />
        {/* <Button
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={() => confirmDeleteProduct(rowData)} // Asegúrate de que 'rowData' contenga el ID
          tooltip="Delete"
          tooltipOptions={{ position: "top" }}
        /> */}
      </div>
    );
  };

  return (
    <div>
      <Toast ref={toast} />
      <div className="">
        <div className="card ">
          <Toolbar
            className="mb-4"
            left={leftToolbarTemplate}
            right={() => (
              <Button
                label="Export"
                icon="pi pi-upload"
                className="p-button-help"
                onClick={exportCSV}
              />
            )}
          ></Toolbar>

          <DataTable
            ref={dt}
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
            <Column
              field="createdAt"
              header="Created At"
              sortable
              body={(rowData) =>
                new Date(rowData.createdAt).toLocaleDateString()
              } // Formatea la fecha
            ></Column>
            <Column
              field="updatedAt"
              header="Updated At"
              sortable
              body={(rowData) =>
                new Date(rowData.updatedAt).toLocaleDateString()
              } // Formatea la fecha
            ></Column>
            <Column
              field="RoleIdRole"
              header="Role"
              body={(rowData) => getRoleName(rowData.RoleIdRole)}
              sortable
              style={{ minWidth: "2rem" }}
            ></Column>
            <Column
              header="Actions"
              body={actionBodyTemplate}
              exportable={false}
            ></Column>
          </DataTable>
        </div>
      </div>

      <Dialog
        visible={deleteProductDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={
          <div>
            <Button
              label="No"
              icon="pi pi-times"
              onClick={hideDeleteProductDialog}
            />
            <Button label="Yes" icon="pi pi-check" onClick={deleteProduct} />
          </div>
        }
        onHide={hideDeleteProductDialog}
      >
        <div className="flex align-items-center justify-content-center flex-column">
          <i
            className="pi pi-exclamation-triangle"
            style={{ fontSize: "2rem", marginBottom: "1rem" }}
          />
          {product && (
            <span>
              ¿Estás seguro de que quieres eliminar <b>{product.name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductsDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={
          <div>
            <Button
              label="No"
              icon="pi pi-times"
              onClick={hideDeleteProductsDialog}
            />
            <Button
              label="Yes"
              icon="pi pi-check"
              onClick={deleteSelectedProducts}
            />
          </div>
        }
        onHide={hideDeleteProductsDialog}
      >
        <div className="flex align-items-center justify-content-center flex-column">
          <i
            className="pi pi-exclamation-triangle"
            style={{ fontSize: "2rem", marginBottom: "1rem" }}
          />
          <span>
            ¿Estás seguro de que quieres eliminar los usuarios seleccionados?
          </span>
        </div>
      </Dialog>
    </div>
  );
}
