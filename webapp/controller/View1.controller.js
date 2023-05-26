sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";
        function onValidate(oEvent){
            var inputEmployee= this.byId("inputEmployee");
            var valueEmployee = inputEmployee.getValue();
            if(valueEmployee.length === 6){
            //    inputEmployee.setDescription("OK");
                this.byId("labelCountry").setVisible(true);
                this.byId("slCountry").setVisible(true);
            }else{
         //       inputEmployee.setDescription("NOT OK");
                this.byId("labelCountry").setVisible(false);
        
            }
        }

       function onFilter(){
             var oJson = this.getView().getModel().getData();
             var filters = [];
             if(oJson.employeeId !==""){
               filters.push(new sap.ui.model.Filter("EmployeeID", "EQ" ,oJson.employeeId))
           }
             if(oJson.countrykey !==""){
               filters.push(new sap.ui.model.Filter("Country", "EQ" ,oJson.countrykey))
           }
           var oTable =this.getView().byId("tableEmployee");
           var oBinding = oTable.getBinding("items")
           oBinding.filter(filters);
          }

          function onClearFilter() {
            var oModel = this.getView().getModel();
            oModel.setProperty("/employeeId","")
            oModel.setProperty("/countrykey","")
           } 


           function showPostalCode(oEvent){
            var itemPressed = oEvent.getSource();
            var context = itemPressed.getBindingContext();
            var object  =  context.getObject() ;
            sap.m.MessageToast.show(object.PostalCode);
            
           }

           
           return Controller.extend("logaligroup.employees.controller.View1", {
            onAfterRendering: function () {
                var   oJSONModel = new sap.ui.model.json.JSONModel();
                var   oView = this.getView();
                var   i18nBundle = oView.getModel("i18n").getResourceBundle();


              /*  var oJSON = 
              {
                    employeeId : "123456",
                    countrykey: "UK",
                    listCountry: [
                  { 
                   key: "US",
                  text: i18nBundle.getText("countryUS")
                  },
                  {
                    key: "UK",
                    text: i18nBundle.getText("countryUK")
                  },
                 {
                   key: "ES",
                  text: i18nBundle.getText("countryES")
                  }
                 ]
                };*/
                oJSONModel.loadData("./localService/mockdata/Employees.json",false);
                
                oView.setModel(oJSONModel);
             },
             onValidate:onValidate,
             onFilter:  onFilter,
             onClearFilter:onClearFilter,
             showPostalCode:showPostalCode
        });  
    });
