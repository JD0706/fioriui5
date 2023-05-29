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
            }).addStyleClass("sapUiSmallMargingEnd");
            ordersTable.addItem(newTable);

            

            var newTableJSON =new sap.m.Table();
            newTableJSON .setWidth("auto");
            newTableJSON .addStyleClass("sapUiSmallMargin"); 

            var columnOrderID =new sap.m.Column();
            var labelOrderID =new sap.m.Label(); 
            labelOrderID.bindProperty("text","i18n>orderID");
            columnOrderID.setHeader(labelOrderID);
            newTableJSON.addColumn(columnOrderID)

            var columnFreight =new sap.m.Column();
            var labelFreight =new sap.m.Label(); 
            labelFreight.bindProperty("text","i18n>freight");
            columnFreight.setHeader(labelFreight);
            newTableJSON.addColumn(columnFreight)

            var columnShipAddress =new sap.m.Column();
            var labelShipAddress =new sap.m.Label(); 
            labelShipAddress.bindProperty("text","i18n>shipAddress");
            columnShipAddress.setHeader(labelShipAddress);
            newTableJSON.addColumn(columnShipAddress);

            

            var columnListItem = new sap.m.ColumnListItem();
            
            var cellOrderID = new sap.m.Label();
            cellOrderID.bindProperty("text","jsonEmployees>OrderID");
            columnListItem.addCell(cellOrderID)

            var cellFreight = new sap.m.Label();
            cellFreight.bindProperty("text","jsonEmployees>Freight");
            columnListItem.addCell(cellFreight);

            var cellShipAddress = new sap.m.Label();
            cellShipAddress.bindProperty("text","jsonEmployees>ShipAddress");
            columnListItem.addCell(cellShipAddress);

            var oBindingInfo = {
             model: "jsonEmployees",
             path: "Orders",
             template: columnListItem
            };

             newTableJSON.bindAggregation( "items", oBindingInfo);
             newTableJSON.bindElement( "jsonEmployees>" + oContext.getPath());
             ordersTable.addItem(newTableJSON);



        }

        function showOrdersDialog(oEvent){
            var iconPressed = oEvent.getSource();
            var oContext=iconPressed.getBindingContext("jsonEmployees")
            if(!this.oDialogOrders){
              this.oDialogOrders = sap.ui.xmlfragment("logaligroup.employees.fragment.DialogOrders", this);
              this.getView().addDependent(this.oDialogOrders);
            }
            this.oDialogOrders.bindElement("jsonEmployees>" + oContext.getPath() ) ;
            this.oDialogOrders.open(); 

          }

          function onCloseOrders(oEvent){

            this.oDialogOrders.close(); 


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
                    visiblebtnHideCity :false,
                   
                    
  
                  })
                  oView.setModel(oJsonModelConfig,"jsonModelConfig");
  

             },
             onValidate:onValidate,
             onFilter:  onFilter,
             onClearFilter:onClearFilter,
             showPostalCode:showPostalCode,
             onsHideCity:onsHideCity,
             onShowCity:onShowCity,
             showOrders:showOrders,
             showOrdersDialog:showOrdersDialog,
             onCloseOrders:onCloseOrders
        });  
    });
