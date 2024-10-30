import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { useNavigate } from "react-router-dom";

export default function ProductsDemo() {
  const [products, setProducts] = useState([]);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const emptyProduct = {
    name: "",
    lastname: "",
    instagram: "",
    otraredsocial: "",
    avatar: "",
  };

  const [product, setProduct] = useState({
    id: null,
    name: "",
    lastname: "",
    instagram: "",
    otraredsocial: "",
    avatar: "",
  });
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}/modelo`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
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

  const openNew = () => {
    navigate("/upload-modelo");
  };

  const hideDialog = () => {
    setProductDialog(false);
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = async () => {
    try {
      const response = await fetch(`${apiUrl}/delete-modelo/${product.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const _products = products.filter((val) => val.id !== product.id);
        setProducts(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Producto eliminado",
          life: 3000,
        });
      }
    } catch (error) {
      console.error("Error al eliminar el modelo:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudo eliminar el modelo",
        life: 3000,
      });
    }
  };

  const editProduct = (product) => {
    setProduct(product);
    setProductDialog(true);
  };

  const saveProduct = async () => {
    setSubmitted(true);

    if (product.name.trim()) {
      try {
        if (product.id) {
          // Actualiza un producto existente usando PUT
          const response = await fetch(`${apiUrl}/edit-modelo/${product.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: product.name,
              lastname: product.lastname,
              instagram: product.instagram,
              otraredsocial: product.otraredsocial,
              avatar: product.avatar,
            }),
          });

          if (response.ok) {
            toast.current.show({
              severity: "success",
              summary: "Successful",
              detail: "Modelo editado",
              life: 3000,
            });
            // Actualiza los datos en el frontend si es necesario
            const updatedProducts = products.map((p) =>
              p.id === product.id ? { ...p, ...product } : p
            );
            setProducts(updatedProducts);
            setProductDialog(false);
            setProduct(emptyProduct);
          }
        }
      } catch (error) {
        console.error("Error al editar el modelo:", error);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "No se pudo editar el modelo",
          life: 3000,
        });
      }
    }
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Gestión de Modelos</h4>
      <InputText
        type="search"
        onInput={(e) => setGlobalFilter(e.target.value)}
        placeholder="Buscar..."
      />
    </div>
  );

  return (
    <div>
      <Toast ref={toast} />
      <div className="card">
        <Toolbar
          className="mb-4"
          left={() => (
            <Button
              label="Nuevo"
              icon="pi pi-plus"
              severity="success"
              onClick={openNew}
            />
          )}
        />

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
          <Column field="name" header="Nombre" sortable></Column>
          <Column field="lastname" header="Apellido" sortable></Column>
          <Column
            field="avatar"
            header="Imagen"
            body={(rowData) => (
              <img
                src={`${rowData.avatar}`}
                alt={rowData.name}
                className="shadow-2 border-round"
                style={{ width: "64px" }}
              />
            )}
          ></Column>
          <Column field="instagram" header="Instagram" sortable></Column>
          <Column
            field="otraredsocial"
            header="Otra Red Social"
            sortable
          ></Column>
          <Column
            body={(rowData) => (
              <div>
                <Button
                  icon="pi pi-pencil"
                  className="p-button-rounded p-button-success mr-2"
                  onClick={() => editProduct(rowData)}
                />
                <Button
                  icon="pi pi-trash"
                  className="p-button-rounded p-button-warning"
                  onClick={() => confirmDeleteProduct(rowData)}
                />
              </div>
            )}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={deleteProductDialog}
        style={{ width: "450px" }}
        header="Confirmación"
        modal
        footer={() => (
          <div>
            <Button
              label="No"
              icon="pi pi-times"
              className="p-button-text"
              onClick={() => setDeleteProductDialog(false)}
            />
            <Button
              label="Sí"
              icon="pi pi-check"
              className="p-button-text"
              onClick={deleteProduct}
            />
          </div>
        )}
        onHide={() => setDeleteProductDialog(false)}
      >
        <div className="confirmation-content">
          <span>¿Estás seguro de que deseas eliminar este modelo?</span>
        </div>
      </Dialog>

      <Dialog
        visible={productDialog}
        style={{ width: "450px" }}
        header="Editar Modelo"
        modal
        footer={() => (
          <div>
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
          </div>
        )}
        onHide={hideDialog}
      >
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="name">Nombre</label>
            <InputText
              id="name"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              required
            />
          </div>
          <div className="p-field">
            <label htmlFor="lastname">Apellido</label>
            <InputText
              id="lastname"
              value={product.lastname}
              onChange={(e) =>
                setProduct({ ...product, lastname: e.target.value })
              }
              required
            />
          </div>
          <div className="p-field">
            <label htmlFor="instagram">Instagram</label>
            <InputText
              id="instagram"
              value={product.instagram}
              onChange={(e) =>
                setProduct({ ...product, instagram: e.target.value })
              }
            />
          </div>
          <div className="p-field">
            <label htmlFor="otraredsocial">Otra Red Social</label>
            <InputText
              id="otraredsocial"
              value={product.otraredsocial}
              onChange={(e) =>
                setProduct({ ...product, otraredsocial: e.target.value })
              }
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
