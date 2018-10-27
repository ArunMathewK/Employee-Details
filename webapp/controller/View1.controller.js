sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/m/MessageToast',
	"sap/ui/core/routing/History"
], function (Controller, JSONModel, Filter, FilterOperator, MessageToast, History) {
	"use strict";

	return Controller.extend("emp.Employeedetails.controller.View1", {

		onInit: function () {
			// var Enames = {
			// 	x1: [{
			// 		title: "Rahul",
			// 		number: "001",
			// 		mail:"rahul@gmail.com",
			// 		mob:"8578919986",
			// 		salary:"30000"
			// 	}, {
			// 		title: "Abi",
			// 		number: "002",
			// 		mail:"abi@gmail.com",
			// 		mob:"8745629892",
			// 		salary:"50000"
			// 	}, {
			// 		title: "Snehesh",
			// 		number: "003",
			// 		mail:"snehesh@gmail.com",
			// 		mob:"9784478366",
			// 		salary:"45000"
			// 	}, {
			// 		title: "Jemsheed",
			// 		number: "004",
			// 		mail:"jemsheed@gmail.com",
			// 		mob:"8127646213",
			// 		salary:"40000"
			// 	}, {
			// 		title: "Jobin",
			// 		number: "005",
			// 		mail:"jobin@gmail.com",
			// 		mob:"9722646213",
			// 		salary:"47000"
			// 	}, {
			// 		title: "Muhallid",
			// 		number: "006",
			// 		mail:"muhallid@gmail.com",
			// 		mob:"9722646538",
			// 		salary:"30000"
			// 	}, {
			// 		title: "Sanju",
			// 		number: "007",
			// 		mail:"sanju@gmail.com",
			// 		mob:"9787543876",
			// 		salary:"25000"
			// 	}]
			// };

			this.getView().setModel(new JSONModel(), "jmodel");
			// this.getView().getModel("jmodel").setProperty("/oModel", Enames);
			this.getView().getModel("jmodel").setProperty("/editable", false);

		},

		item: function (oevent) {
			var obj = oevent.getParameters().listItem.getBindingContext("myData").getObject(),
				jmodel = this.getView().getModel("myData");
			jmodel.setProperty("/Panel", obj);

		},
		onSearch: function (event) {
			var olist = this.getView().byId("list1"),
				arr = [],
				binding,
				filters;
			// filtersa;
			filters = new Filter({
				filters: [
					new Filter("title", FilterOperator.Contains, event.getSource().getValue()),
					new Filter("number", FilterOperator.Contains, event.getSource().getValue()),
					new Filter("currency", FilterOperator.Contains, event.getSource().getValue())
				],
				and: false
			});
			// filtersa = new Filter("number", FilterOperator.Contains,event.getSource().getValue()); 
			binding = olist.getBinding("items");
			arr.push(filters);

			binding.filter(arr);

		},
		onNavigate: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("View1");
		},
		Edit: function () {
			this.getView().getModel("jmodel").setProperty("/editable", true);
			this.getView().byId("cancelbtn").setVisible(true);
			this.getView().byId("savebtn").setVisible(true);
			this.getView().byId("editBtn").setVisible(false);
		},
		Save: function () {
			this.getView().getModel("jmodel").setProperty("/editable", false);
			var id = this.createId("abc");
			// create dialog lazily
			if (!this.oDialog) {
				// create dialog via fragment factory
				this.oDialog = sap.ui.xmlfragment(id, "emp.Employeedetails.Fragments.demo", this);
				this.getView().addDependent(this.oDialog);
			}

			this.oDialog.open();
		},

		onCloseDialog: function () {
			this.getView().byId("savebtn").setVisible(false);
			this.getView().byId("editBtn").setVisible(true);
			this.getView().byId("cancelbtn").setVisible(false);
			this.oDialog.close();
		},

		Updated: function () {
			var firstItem = this.getView().getModel("myData").getProperty("/details")[1];
			// this.getView().byId("list1").setSelectedItem(firstItem,true);
			var jmodel = this.getView().getModel("myData");
			jmodel.setProperty("/Panel", firstItem);
		},

		Cancel: function () {

			var id = this.createId("abcd");
			// create dialog lazily
			if (!this.oDialoga) {
				// create dialog via fragment factory
				this.oDialoga = sap.ui.xmlfragment(id, "emp.Employeedetails.Fragments.demo1", this);
				this.getView().addDependent(this.oDialoga);
			}

			this.oDialoga.open();
		},

		cancelbtn: function () {
			this.getView().getModel("jmodel").setProperty("/editable", false);
			this.getView().byId("savebtn").setVisible(false);
			this.getView().byId("editBtn").setVisible(true);
			this.getView().byId("cancelbtn").setVisible(false);
			this.oDialoga.close();
		},
		addEmployee: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("sview");
		},
		onObjectMatched: function (oEvent) {
			this.getView().bindElement({
				path: "/" + oEvent.getParameter("arguments").invoicePath,
				model: "invoice"
			});
		},
		logOut: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			sPreviousHash = sap.ui.core.UIComponent.getRouterFor(this);
			sPreviousHash.navTo("LoginView", {}, true);

		}

	});
});