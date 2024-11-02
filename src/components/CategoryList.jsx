import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog"; // or wherever your Dialog component is
import classNames from "classnames";

export default function ProductsDemo() {
  let emptyProduct = {
    name: "",
    photo: null,
    id: null,
  };

  const [products, setProducts] = useState([]);
  const [productDialog, setProductDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${apiUrl}/categories`);
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
    if (product.name.trim() && product.photo) {
      try {
        const response = await createProduct(product);
        const data = await response.json();
        setProducts((prevProducts) => [...prevProducts, data]);

        setProductDialog(false);
        setProduct(emptyProduct);
        await fetchProducts(); // Recargar productos
      } catch (error) {
        console.error("Error guardando el producto:", error);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "No se pudo guardar el producto",
          life: 3000,
        });
      }
    }
  };

  const createProduct = async (newProduct) => {
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("category", newProduct.photo);

    return await fetch(`${apiUrl}/create-category`, {
      method: "POST",
      body: formData,
    });
  };

  const leftToolbarTemplate = () => (
    <div className="flex flex-wrap gap-2">
      <Button
        label="New"
        icon="pi pi-plus"
        severity="success"
        onClick={openNew}
      />
    </div>
  );

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Categorías ({products.length})</h4>
      <InputText
        type="search"
        onInput={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );

  const onFileChange = (e) => {
    setProduct({ ...product, photo: e.target.files[0] });
  };

  return (
    <div>
      <Toast ref={toast} />
      <div className="card">
        <Toolbar className="mb-4" left={leftToolbarTemplate} />
        <DataTable
          value={products}
          paginator
          rows={10}
          globalFilter={globalFilter}
          header={header}
        >
          <Column field="name" header="Name" sortable></Column>
          <Column
            field="photo"
            header="Photo"
            sortable
            body={(rowData) => (
              <img src={rowData.photo} alt={rowData.name} width="50" />
            )}
          />
          <Column field="createdAt" header="Created At" sortable></Column>
          <Column field="updatedAt" header="Updated At" sortable></Column>
        </DataTable>
      </div>

      {/* Modal de crear producto */}
      <Dialog
        visible={productDialog}
        style={{ width: "450px" }}
        header="Detalles del Producto"
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
        <div>
          <label htmlFor="name">Nombre</label>
          <InputText
            id="name"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !product.name })}
          />
          {submitted && !product.name && (
            <small className="p-error">El nombre es requerido.</small>
          )}
        </div>
        <div>
          <label htmlFor="photo">Foto</label>
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={onFileChange}
            className={classNames({ "p-invalid": submitted && !product.photo })}
          />
          {submitted && !product.photo && (
            <small className="p-error">La foto es requerida.</small>
          )}
        </div>
      </Dialog>
    </div>
  );
}
