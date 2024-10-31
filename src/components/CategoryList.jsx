import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { FileUpload } from "primereact/fileupload";
import { classNames } from "primereact/utils";
import { toast } from "primereact/toast";

export default function ProductsDemo() {
  let emptyProduct = {
    name: "",
    photo: null,
    id: null,
  };

  const [products, setProducts] = useState([]);
  const [productDialog, setProductDialog] = useState(false);
  const [uploadDialog, setUploadDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  const toastRef = useRef(null);
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
              p.id_category === product.id ? data : p
            );
          } else {
            return [...prevProducts, data];
          }
        });

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

  const updateProduct = async (updatedProduct) => {
    const formData = new FormData();
    formData.append("name", updatedProduct.name);
    if (updatedProduct.photo) {
      formData.append("category", updatedProduct.photo);
    }

    return await fetch(`${apiUrl}/update/${updatedProduct.id}`, {
      method: "PUT",
      body: formData,
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

        const _products = products.filter(
          (val) => val.id_category !== product.id
        );
        setProducts(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);

        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Deleted",
          life: 3000,
        });

        await fetchProducts(); // Recargar productos
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
      setProduct(selectedProducts[0]);
      setDeleteProductDialog(true);
    } else {
      console.error("No products selected for deletion.");
    }
  };

  const uploadPhoto = async (file) => {
    if (product && product.name && file) {
      const formData = new FormData();
      formData.append("categoryName", product.name);
      formData.append("file", file);

      try {
        const response = await fetch(`${apiUrl}/upload-categophoto`, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Foto subida exitosamente",
            life: 3000,
          });
          setUploadDialog(false);
        } else {
          throw new Error("Error uploading photo");
        }
      } catch (error) {
        console.error("Error uploading photo:", error);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "No se pudo subir la foto",
          life: 3000,
        });
      }
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
      <h4 className="m-0">Categorías ({products.length})</h4>
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
          icon="pi pi-upload"
          className="p-button-info mr-2"
          onClick={() => {
            setProduct(rowData);
            setUploadDialog(true);
          }}
          tooltip="Upload"
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

  return (
    <div>
      <Toast ref={toast} />
      <div className="card">
        <Toolbar className="mb-4" left={leftToolbarTemplate} />
        <DataTable
          value={products}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          dataKey="id_category"
          paginator
          rows={10}
          globalFilter={globalFilter}
          header={header}
        >
          <Column selectionMode="multiple" exportable={false}></Column>
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
          <Column
            header="Actions"
            body={actionBodyTemplate}
            exportable={false}
          ></Column>
        </DataTable>
      </div>

      {/* Modal de crear/editar producto */}
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
      </Dialog>

      {/* Modal de cargar archivo */}
      <Dialog
        visible={uploadDialog}
        style={{ width: "450px" }}
        header="Subir Foto o Video"
        modal
        footer={
          <>
            <Button
              label="Cancelar"
              icon="pi pi-times"
              className="p-button-text"
              onClick={() => setUploadDialog(false)}
            />
            <Button
              label="Subir"
              icon="pi pi-check"
              className="p-button-text"
              onClick={() => {
                if (product.photo) {
                  uploadPhoto(product.photo);
                } else {
                  toast.current.show({
                    severity: "warn",
                    summary: "Advertencia",
                    detail: "Por favor selecciona un archivo",
                    life: 3000,
                  });
                }
              }}
            />
          </>
        }
        onHide={() => setUploadDialog(false)}
      >
        <div>
          <FileUpload
            name="file"
            mode="basic"
            accept="image/*,video/*"
            onSelect={(e) => {
              const file = e.files[0]; // Aquí obtienes el archivo seleccionado
              if (file) {
                setProduct({ ...product, photo: file }); // Guardar el archivo en el estado
              }
            }}
            onError={(e) => {
              console.error("Error uploading file:", e);
              toastRef.current.show({
                severity: "error",
                summary: "Error",
                detail: "Error al cargar el archivo",
                life: 3000,
              });
            }}
            chooseLabel="Seleccionar archivo"
            uploadLabel="Subir"
            cancelLabel="Cancelar"
          />
        </div>
      </Dialog>

      {/* Modal de eliminar */}
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
              label="Eliminar"
              icon="pi pi-check"
              className="p-button-text"
              onClick={deleteProduct}
            />
          </>
        }
        onHide={() => setDeleteProductDialog(false)}
      >
        <div>
          {product && (
            <span>
              ¿Estás seguro de que deseas eliminar <b>{product.name}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
}
