sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"
], function (Controller, History, MessageToast, JSONModel) {
	"use strict";

	return Controller.extend("emp.Employeedetails.controller.View2", {
		
		add: function (oEvent) {

			var ob1 = this.getView().byId("i1").getValue();
			var ob2 = this.getView().byId("i2").getValue();
			var ob3 = this.getView().byId("i3").getValue();
			var ob4 = this.getView().byId("i4").getValue();
			var ob5 = this.getView().byId("i5").getValue();
			var ob6 = this.getView().byId("i6").getValue();

			if (ob1 !== "" && ob2 !== "" && ob3 !== "" && ob4 !== "" && ob5 !== "" && ob6 !== "") {

				var items = {
					title: ob1,
					number: ob2,
					mail: ob3,
					mob: ob4,
					salary: ob5,
					currency: ob6
				};
				var itemData = [];
				var oModel = this.getView().getModel("myData");
				for (var i = 0; i < oModel.oData.details.length; i++) {
					itemData.push(oModel.oData.details[i]);
				}
				itemData.push(items);
				oModel.setProperty("/details", itemData);
				itemData = oModel.getProperty("/details", itemData);

				var id = this.createId("abc");
				// create dialog lazily
				if (!this.oDialog) {
					// create dialog via fragment factory
					this.oDialog = sap.ui.xmlfragment(id, "emp.Employeedetails.Fragments.demo2", this);
					this.getView().addDependent(this.oDialog);
				}

				this.oDialog.open();

			} else if(ob1 === "") {

				MessageToast.show("fields Can't be Empty");
				this.getView().byId("i1").setValueState("Error");
				
			} else if(ob2 === ""){
				
				MessageToast.show("fields Can't be Empty");
				this.getView().byId("i2").setValueState("Error");
			} else if( ob3 === "" ){
				
				MessageToast.show("fields Can't be Empty");
				this.getView().byId("i3").setValueState("Error");
				 
			} else if( ob4 === "" ){
				
				MessageToast.show("fields Can't be Empty");
				this.getView().byId("i4").setValueState("Error");
			} else if(ob5 === "" ){
				
				MessageToast.show("fields Can't be Empty");
				this.getView().byId("i5").setValueState("Error");
			} else if(ob6 === "" ){
				
				MessageToast.show("fields Can't be Empty");
				this.getView().byId("i6").setValueState("Error");
			}

		},
		cancel: function () {
			
				this.getView().byId("i1").setValue("");
				this.getView().byId("i2").setValue("");
				this.getView().byId("i3").setValue("");
				this.getView().byId("i4").setValue("");
				this.getView().byId("i5").setValue("");
				this.getView().byId("i6").setValue("");
				
				this.getView().byId("i1").setValueState("None");
				this.getView().byId("i2").setValueState("None");
				this.getView().byId("i3").setValueState("None");
				this.getView().byId("i4").setValueState("None");
				this.getView().byId("i5").setValueState("None");
				this.getView().byId("i6").setValueState("None");
			
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("Employee", {}, true);
			}
		},
		onCloseDialog: function () {
			this.oDialog.close();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Employee");

			this.getView().byId("i1").setValue("");
			this.getView().byId("i2").setValue("");
			this.getView().byId("i3").setValue("");
			this.getView().byId("i4").setValue("");
			this.getView().byId("i5").setValue("");
			this.getView().byId("i6").setValue("");
			
			this.getView().byId("i1").setValueState("None");
			this.getView().byId("i2").setValueState("None");
			this.getView().byId("i3").setValueState("None");
			this.getView().byId("i4").setValueState("None");
			this.getView().byId("i5").setValueState("None");
			this.getView().byId("i6").setValueState("None");
			}
		// validate:function (oValue) {
		// 	  var mailregex = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
		// 	  if (!oValue.match(mailregex)) {
		// 	  throw new sap.ui.model.ValidateException("'" + oValue + "' is not a valid email address");
		// 	  }
		// 			}

	});

});