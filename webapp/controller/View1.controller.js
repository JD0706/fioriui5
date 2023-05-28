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
             var oJson = this.getView().getModel("jsonCountries").getData();
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
            var oModel = this.getView().getModel("jsonCountries");
            oModel.setProperty("/employeeId","")
            oModel.setProperty("/countrykey","")
           } 


           function showPostalCode(oEvent){
            var itemPressed = oEvent.getSource();
            var context = itemPressed.getBindingContext("jsonEmployees");
            var object  =  context.getObject() ;
            sap.m.MessageToast.show(object.PostalCode);
            
           }

           function onShowCity(oEvent){
           var oJsonModelConfig=this.getView().getModel("jsonModelConfig")
               oJsonModelConfig.setProperty("/visibleCity",true);
               oJsonModelConfig.setProperty("/visibleBtnShowCity",false);
               oJsonModelConfig.setProperty("/visibleBtnHideCity",true);
         }

         function onsHideCity(oEvent){
          var oJsonModelConfig=this.getView().getModel("jsonModelConfig")
             oJsonModelConfig.setProperty("/visibleCity",false);
             oJsonModelConfig.setProperty("/visibleBtnShowCity",true);
             oJsonModelConfig.setProperty("/visibleBtnHideCity",false);
       }
        
        function showOrders(oEvent){
            var ordersTable= this.getView().byId("ordersTable");
            ordersTable.destroyItems();

            var itemPresed = oEvent.getSource();
            var oContext = itemPresed.getBindingContext("jsonEmployees");
            var object = oContext.getObject();
            var orders = object.Orders;

             var orderItems =[];

             for(var i in orders ){

               orderItems.push(new sap.m.ColumnListItem({
                cells : [
                    new sap.m.Label({text: orders[i].OrderID}),
                    new sap.m.Label({text: orders[i].Freight}),
                    new sap.m.Label({text: orders[i].ShipAddress}),
                ]
               }) )

             }


            var newTable =new  sap.m.Table({
                width :"auto",
                columns : [
                    new sap.m.Column({
                        header :new sap.m.Label({
                            text:"{i18n>orderID}"
                        })
                    }),
                    new sap.m.Column({
                        header :new sap.m.Label({
                            text:"{i18n>freigh}"
                        })
                    }),
                    new sap.m.Column({
                        header :new sap.m.Label({
                            text:"{i18n>shipAddress}"
                        })
                    }) 

                ],
                items : orderItems
            }).addStyleClass("sapUiSmallMarging");
            ordersTable.addItem(newTable);

        }
           
           return Controller.extend("logaligroup.employees.controller.View1", {
            onAfterRendering: function () {
                var   oView = this.getView();
                var   oJSONModel = new sap.ui.model.json.JSONModel();
                
                var   i18nBundle = oView.getModel("i18n").getResourceBundle();
                oJSONModel.loadData("./localService/mockdata/Employees.json",false);
                oView.setModel(oJSONModel,"jsonEmployees");

                var   oJSONModelCountries = new sap.ui.model.json.JSONModel();
                oJSONModelCountries.loadData("./localService/mockdata/Countries.json",false);
                oView.setModel(oJSONModelCountries,"jsonCountries");

                var oJsonModelConfig = new sap.ui.model.json.JSONModel({

                    visibleID :true,
                    visibleName :true,
                    visibleCity :false,
                    visiblebtnShowCity :true,
                    visiblebtnHideCity :false
                    
  
                  })
                  oView.setModel(oJsonModelConfig,"jsonModelConfig");
  

             },
             onValidate:onValidate,
             onFilter:  onFilter,
             onClearFilter:onClearFilter,
             showPostalCode:showPostalCode,
             onsHideCity:onsHideCity,
             onShowCity:onShowCity,
             showOrders:showOrders
        });  
    });
