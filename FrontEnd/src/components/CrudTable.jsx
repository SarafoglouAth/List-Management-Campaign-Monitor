// Import necessary React modules and components
import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import useCRUD from "../hooks/useCRUD"; // Custom hook for CRUD operations
import Cv from "./Cv"; // Component for showing CV

import { trackAPIError, trackTimeLookedAtCV ,trackSubscribers } from "../hooks/GA4_Actions.js";

export default function ListManagement() {
  // Define an empty subscriber object
  let emptyProduct = {
    Name: "",
    EmailAddress: null,
  };

  // State variables to manage the list of subscribers and UI states
  const [products, setProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [showCVDialog, setShowCVDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const toast = useRef(null); // Reference for Toast notifications
  const dt = useRef(null); // Reference for DataTable
  const [action, setAction] = useState({
    actionType: "get", // Default action type
    product: null,
    url: `/getAllSubscribers`, // API endpoint for fetching subscribers
  });

  const getEmailType = (email) => {
    if (
      email &&
      (email.includes("@gmail") ||
        email.includes("@yahoo") ||
        email.includes("@hotmail") ||
        email.includes("@outlook"))
    ) {
      return "personal";
    } else {
      return "generic";
    }
  };

  // Use custom hook for CRUD operations
  const { loadingCRUD, errorCRUD, response, reset } = useCRUD(
    action?.actionType,
    action?.product,
    action?.url
  );

  // Effect to trigger fetching subscribers when loadingCRUD changes
  useEffect(() => {
    if (loadingCRUD) {
      setAction({
        actionType: "get",
        product: null,
        url: `/getAllSubscribers`,
      });
    }
  }, [loadingCRUD]);

  // Effect to handle responses from CRUD operations
  useEffect(() => {
    if (errorCRUD) {
      let errorMsg = errorCRUD;
      if (errorCRUD === "[object Object]") {
        trackAPIError(
          "There might be a problem with your keys",
          action?.actionType
        );
        errorMsg = "There might be a problem with your keys";
      }
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: errorMsg,
        life: 3000,
      });
      reset(false); // Reset error state
      return;
    }

    if (response) {
      let messageDetail = "";

      // Switch-case to handle different response scenarios
      switch (response.actionType) {
        case "get":
          setProducts(response.res.data.Results); // Set products state with fetched data
          break;
        case "create":
          messageDetail = response?.res?.data || " Created successfully";
          setProductDialog(false);
          trackSubscribers(products.length, "create");
          break;
        case "delete":
          messageDetail = response?.res?.data || " Deleted successfully";
          trackSubscribers(products.length, "delete");
          break;
        default:
          break;
      }

      if (messageDetail) {
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: messageDetail,
          life: 3000,
        });
      }

      if (response.actionType !== "get") {
        setShowCVDialog(true); // Show CV dialog if not a 'get' action
        if (!startTime) {
          setStartTime(Date.now());
        }
        setTimeout(() => {
          reset(true); // Reset state after 60 seconds
        }, 60000);
      }

      setAction(null); // Reset action state
    }
  }, [errorCRUD, response]);

  // Open dialog to create a new subscriber
  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  // Hide create/edit dialog
  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  // Hide delete confirmation dialog
  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  // Save a new or edited subscriber
  const saveProduct = () => {
    setSubmitted(true);

    // Validate input
    if (!product.Name || !product.EmailAddress) {
      return;
    }

    // Set action to create a new subscriber
    const EmailType = getEmailType(product.EmailAddress);
    let elapsedTime = 0;
    if (startTime) {
      // Calculate time elapsed
      elapsedTime = (Date.now() - startTime) / 1000; // Convert to seconds
      console.log(`Time passed: ${elapsedTime} seconds`);
    }
    setStartTime(null);
    product.EmailType = EmailType;
    product.TimeToCompletion = elapsedTime;
    setAction({ actionType: "create", product, url: `/addOneSubscriber` });
  };

  // Show delete confirmation dialog for a specific subscriber
  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  // Delete a subscriber
  const deleteProduct = () => {
    const EmailType = getEmailType(product.EmailAddress);
    product.EmailType = EmailType;
    const ProductIndex =
      products.findIndex((p) => p.EmailAddress === product.EmailAddress) + 1;
    console.log("ProductIndex", ProductIndex);
    const indexInArray = `${ProductIndex}/${products.length}`;
    product.position = indexInArray;
    setAction({
      actionType: "delete",
      product,
      url: `/deleteOneSubscriber/${product?.EmailAddress}`,
    });
    setDeleteProductDialog(false);
    setProduct(emptyProduct); // Reset the product state
  };

  // Export data as CSV
  const exportCSV = () => {
    dt.current.exportCSV();
  };

  // Handle input changes in dialogs
  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };
    _product[`${name}`] = val;
    setProduct(_product);

    if (!startTime) {
      setStartTime(Date.now());
    }
  };
  const hideCvDialog = () => {
    setShowCVDialog((prev) => !prev);
    if (startTime) {
      const elapsedTime = (Date.now() - startTime) / 1000; // Convert to seconds
      console.log(`Time passed: ${elapsedTime} seconds`);
      trackTimeLookedAtCV(elapsedTime);
      setStartTime(null);
    }
  };

  // Define the left toolbar template
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
          label="Refresh"
          icon="pi pi-refresh"
          severity="info"
          onClick={() => {
            setAction({
              actionType: "get",
              product: null,
              url: `/getAllSubscribers`,
            });
          }}
        />
      </div>
    );
  };

  // Define the right toolbar template
  const rightToolbarTemplate = () => {
    return (
      <Button
        label="Export"
        icon="pi pi-upload"
        className="p-button-help"
        onClick={exportCSV}
      />
    );
  };

  // Template for action buttons in the DataTable
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  // Header for DataTable with search functionality
  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Manage Subscribers</h4>
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </IconField>
    </div>
  );

  // Footer for product dialog
  const productDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button
        label="Save"
        icon="pi pi-check"
        loading={loadingCRUD}
        onClick={saveProduct}
      />
    </React.Fragment>
  );

  // Footer for delete confirmation dialog
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );

  // Render the component
  return (
    <div className="py-8">
      <h1>{errorCRUD}</h1>
    
      <div className="flex justify-content-start text-center w-full flex-column gap-2">
        <h4 className="m-0">Disclaimer </h4>
        <p>
          The API takes approximately one minute to make Post changes . This
          might be a problem with the API wrapper on the node server I used or
          the campaignmonitor/api itself.
        </p>
        <p>For that reason, an extra functionality was added.</p>
      </div>
      <Toast ref={toast} />
      <div className="card">
        <Toolbar
          className="mb-4"
          start={leftToolbarTemplate}
          end={rightToolbarTemplate}
        ></Toolbar>

        <DataTable
          ref={dt}
          value={products}
          dataKey="EmailAddress"
          rows={10}
          loading={loadingCRUD}
          className="p-datatable-gridlines"
          paginator
          paginatorTemplate=" PrevPageLink PageLinks NextPageLink  CurrentPageReport "
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          globalFilter={globalFilter}
          header={header}
        >
          <Column
            field="Name"
            header="Name"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>

          <Column
            field="EmailAddress"
            header="Email Address"
            style={{ minWidth: "16rem" }}
            sortable
          />
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={productDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Subscriber Details"
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="name" className="font-bold">
            Name
          </label>
          <InputText
            id="Name"
            value={product.Name}
            onChange={(e) => onInputChange(e, "Name")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !product.Name })}
          />
          {submitted && !product.Name && (
            <small className="p-error">Name is required.</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="EmailAddress" className="font-bold">
            Email Address
          </label>
          <InputText
            id="EmailAddress"
            value={product.image}
            onChange={(e) => onInputChange(e, "EmailAddress")}
            required
            autoFocus
            className={classNames({
              "p-invalid": submitted && !product.EmailAddress,
            })}
          />
          {submitted && !product.EmailAddress && (
            <small className="p-error">Email Address is required.</small>
          )}
        </div>
      </Dialog>
      <Dialog
        visible={showCVDialog}
        onHide={() => hideCvDialog()}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Have a look at my CV while you wait "
        modal
      >
        <Cv />
      </Dialog>

      <Dialog
        visible={deleteProductDialog}
        style={{ width: "50rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header={
          <div>
            {" "}
            <i
              className="pi pi-exclamation-triangle mr-3 "
              style={{ fontSize: "2rem" }}
            />
            Confirm
          </div>
        }
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          {product && (
            <span className=" ">
              Are you sure you want to delete <b>{product.EmailAddress}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
}
