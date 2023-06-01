sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("logaligroup.employees.controller.controller.App", {
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

            var   oJsonModelLayout = new sap.ui.model.json.JSONModel();
            oJsonModelLayout.loadData("./localService/mockdata/Layout.json",false);
            oView.setModel( oJsonModelLayout,"jsonModelLayout");


       },
      });
    }
  );
  