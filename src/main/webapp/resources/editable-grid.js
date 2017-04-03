/*
 This file is part of Ext JS 3.4

 Copyright (c) 2011-2013 Sencha Inc

 Contact:  http://www.sencha.com/contact

 GNU General Public License Usage
 This file may be used under the terms of the GNU General Public License version 3.0 as
 published by the Free Software Foundation and appearing in the file LICENSE included in the
 packaging of this file.

 Please review the following information to ensure the GNU General Public License version 3.0
 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

 If you are unsure which license is appropriate for your use, please contact the sales department
 at http://www.sencha.com/contact.

 Build date: 2013-04-03 15:07:25
 */

var host = location.protocol + '//' + location.host;

Ext.onReady(function(){
    Ext.QuickTips.init();

    var Employee = Ext.data.Record.create([{
        name: 'firstName',
        type: 'string'
    }, {
        name: 'lastName',
        type: 'string'
    }, {
        name: 'id',
        type: 'int'
    },{
        name: 'departmentId',
        type: 'int'
    }]);

    var Department = Ext.data.Record.create(
        [
            {
            name: "id",
            type: "int"
            },
            {
            name: "name",
            type: "string"
            }
        ]
    );


        var employersStore = new Ext.data.GroupingStore({
            reader: new Ext.data.JsonReader({fields: Employee}),
            url:location.protocol + '//' + location.host+"/api/employer/find",
            sortInfo: {field: 'id', direction: 'ASC'}
        });

        var departmentStore = new Ext.data.GroupingStore({
            reader: new Ext.data.JsonReader({fields: Department}),
            url: location.protocol +"//" + location.host+"/api/department/find",
            sortInfo: {field: 'id', direction: 'ASC'}
        });



        var employersGrid = new Ext.grid.GridPanel({
            width: 600,
            region:'center',
            margins: '0 5 5 5',
            autoExpandColumn: 'name',
            store: employersStore,

            view: new Ext.grid.GroupingView({
                markDirty: false
            }),
            tbar: [{
                iconCls: 'icon-user-add',
                text: 'Add Employee',
                handler: function(){
                    createAddEmployerForm()
                }
            },{
                ref: '../removeBtn',
                iconCls: 'icon-user-delete',
                text: 'Remove Employee',
                disabled: true,
                handler: function(){
                   var s = employersGrid.getSelectionModel().getSelections();
                    for(var i=0; i < s.length; i++){
                        sendData("GET", host+"/api/employer/delete/"+s[i].id, null, employersGrid, employersStore)
                    }
                }
            },{
                ref: '../updateBtn',
                iconCls: 'icon-user-delete',
                text: 'Update Employee',
                disabled: true,
                handler: function(){
                    var s = employersGrid.getSelectionModel().getSelections()[0].data;
                    var tempEmpl = {
                        "id" :s.id,
                        "lastName" :s.lastName,
                        "firstName":s.firstName,
                        "departmentId":s.departmentId
                    }
                        createUpdateEmployerForm(tempEmpl);
                    //sendData("GET", host+"/api/employer/delete/"+s[i].id, null, employersGrid, employersStore)
                }
            }
            ],

            columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'User id',
                    dataIndex: 'id',
                    width: 50,
                    sortable: true,
                    editable: false,

                },{
                    id: 'name',
                    header: 'First Name',
                    dataIndex: 'firstName',
                    width: 220,
                    sortable: true,

                },{
                    header: 'Last Name',
                    dataIndex: 'lastName',
                    width: 150,
                    sortable: true,

                },{
                    header: 'Department ID',
                    dataIndex: 'departmentId',
                    width: 100,
                    sortable: true,

                }]
        });

        var departmentGrid = new Ext.grid.GridPanel({
        width:600,
        height:200,
        layout:'fit',
        margins: '5 5 0',
        region: 'north',
        split: true,
        minHeight: 100,
        maxHeight: 500,
        autoExpandColumn: 'name',
        store: departmentStore,

        view: new Ext.grid.GroupingView({
            markDirty: false
        }),
        tbar: [{
            text: 'Add Department',
            handler: function(){
                createAddDepartmentForm();
            }
        },{
            ref: '../removeBtn',
            iconCls: 'icon-dept-delete',
            text: 'Remove department',
            disabled: true,
            handler: function(){
                var s = departmentGrid.getSelectionModel().getSelections();
                for(var i=0; i < s.length; i++){
                    sendData("GET", host+"/api/department/delete/"+s[i].id, null, departmentGrid, departmentStore)
                }
            }
        },
            {
                ref: '../updateBtn',
                iconCls: 'icon-dept-update',
                text: 'Update department',
                disabled: true,
                handler: function(){
                    var tempDept = departmentGrid.getSelectionModel().getSelections()[0].data;
                        createUpdateDepartmentForm(tempDept)
                }
            }
        ],

        columns: [
            new Ext.grid.RowNumberer(),
            {
                header: 'id',
                dataIndex: 'id',
                width: 50,
                sortable: true,
                editable: false

            },{
                id: 'name',
                header: 'Department name',
                dataIndex: 'name',
                width: 220,
                sortable: true,

            }]
    });

        var layout = new Ext.Panel({
            title: 'Employers and departments',
            layout: 'border',
            layoutConfig: {
                columns: 1
            },
            width:600,
            height: 600,
            items: [employersGrid, departmentGrid]
        });
        layout.render(Ext.getBody());

        employersGrid.getSelectionModel().on('selectionchange', function(sm){
            employersGrid.removeBtn.setDisabled(sm.getCount() < 1);
        });

        employersGrid.getSelectionModel().on('selectionchange', function(sm){
            employersGrid.updateBtn.setDisabled(sm.getCount() < 1);
        });

        departmentGrid.getSelectionModel().on('selectionchange', function(sm){
        departmentGrid.removeBtn.setDisabled(sm.getCount() < 1);
         });

         departmentGrid.getSelectionModel().on('selectionchange', function(sm){
        departmentGrid.updateBtn.setDisabled(sm.getCount() < 1);
         });


    initStore(employersStore);
    initStore(departmentStore);

    function initStore(store) {
        store.load({
            callback: function(){
            }
        });

    }

    function sendData(method, url, jsonData, grid, store) {
        Ext.Ajax.request({
            method: method,
            url: url,
            async: false,
            jsonData:  jsonData,
            success: function (response) {
                initStore(store);
                grid.getView().refresh();
            },
            failure: function (e, jqxhr) {
                alert('failure!');
                alert(e.status);
            }
        });
    }

    function createAddDepartmentForm(){Ext.onReady(function () {

        var deptForm = new Ext.form.FormPanel({
            frame: true,
            items: [
                { xtype:'textfield', fieldLabel: 'Name', name: 'name' }
            ]
        });

        var window = new Ext.Window({
            title: "Add department",
            border: false,
            width: 300,
            height: 100,
            layout:'fit',
            items: deptForm,
            resizable: false,

            buttons: [
                {
                    text: 'Create',
                    formBind: true,
                    handler: function (btn, evt) {
                        var newDept = new Department({
                            name: deptForm.getForm().findField('name').getValue()
                        });
                        var dataDept = JSON.stringify(newDept.data);
                        sendData("POST", host+"/api/department/create", dataDept, departmentGrid, departmentStore)
                    }
                },
                {
                    text: 'Close',
                    formBind: false,
                    handler: function (btn, evt) {
                        window.destroy()
                    }
                }
            ]
        });
        window.show();
    });
    }

    function createAddEmployerForm(){Ext.onReady(function () {

        var emplForm = new Ext.form.FormPanel({
            frame: true,
            items: [
                { xtype:'textfield', fieldLabel: 'First name', name: 'firstName' },
                { xtype:'textfield', fieldLabel: 'Last name', name: 'lastName' },
                { xtype:'numberfield', fieldLabel: 'Department id', name: 'departmentId' }
            ]
        });

        var window = new Ext.Window({
            title: "Add employer",
            border: false,
            width: 300,
            height: 160,
            layout:'fit',
            items: emplForm,
            resizable: false,

            buttons: [
                {
                    text: 'Create',
                    formBind: true,
                    handler: function (btn, evt) {
                        var newEmpl = new Employee({
                            firstName: emplForm.getForm().findField('firstName').getValue(),
                            lastName: emplForm.getForm().findField('lastName').getValue(),
                            departmentId: emplForm.getForm().findField('departmentId').getValue()
                        });
                        var dataEmpl = JSON.stringify(newEmpl.data);
                        sendData("POST", host+"/api/employer/create", dataEmpl, employersGrid, employersStore)
                    }
                },
                {
                    text: 'Close',
                    formBind: false,
                    handler: function (btn, evt) {
                        window.destroy()
                    }
                }
            ]
        });
        window.show();
    });
    }

    function createUpdateEmployerForm(empl){Ext.onReady(function () {

        var emplForm = new Ext.form.FormPanel({
            frame: true,
            items: [
                { xtype:'numberfield', fieldLabel: 'User id', name: 'id', readOnly: true, value: empl.id },
                { xtype:'textfield', fieldLabel: 'First name', name: 'firstName', value: empl.firstName },
                { xtype:'textfield', fieldLabel: 'Last name', name: 'lastName', value: empl.lastName },
                { xtype:'numberfield', fieldLabel: 'Department id', name: 'departmentId', value: empl.departmentId }
            ]
        });

        var window = new Ext.Window({
            title: "Update employer",
            border: false,
            width: 300,
            height: 180,
            layout:'fit',
            items: emplForm,
            resizable: false,

            buttons: [
                {
                    text: 'Update',
                    formBind: true,
                    handler: function (btn, evt) {
                        var newEmpl = new Employee({
                            id: emplForm.getForm().findField('id').getValue(),
                            firstName: emplForm.getForm().findField('firstName').getValue(),
                            lastName: emplForm.getForm().findField('lastName').getValue(),
                            departmentId: emplForm.getForm().findField('departmentId').getValue()
                        });
                        var dataEmpl = JSON.stringify(newEmpl.data);
                        sendData("POST", host+"/api/employer/update/", dataEmpl, employersGrid, employersStore)
                    }
                },
                {
                    text: 'Close',
                    formBind: false,
                    handler: function (btn, evt) {
                        window.destroy()
                    }
                }
            ]
        });
        window.show();
    });
    }

    function createUpdateDepartmentForm(dept){Ext.onReady(function () {

        var deptForm = new Ext.form.FormPanel({
            frame: true,
            items: [
                { xtype:'numberfield', fieldLabel: 'Department id', name: 'id', readOnly: true, value: dept.id },
                { xtype:'textfield', fieldLabel: 'Name', name: 'name', value: dept.name },
            ]
        });

        var window = new Ext.Window({
            title: "Update department",
            border: false,
            width: 300,
            height: 140,
            layout:'fit',
            items: deptForm,
            resizable: false,

            buttons: [
                {
                    text: 'Update',
                    formBind: true,
                    handler: function (btn, evt) {
                        var newDept = new Department({
                            id: deptForm.getForm().findField('id').getValue(),
                            name: deptForm.getForm().findField('name').getValue()
                        });
                        var dataDept = JSON.stringify(newDept.data);
                        sendData("POST", host+"/api/department/update/", dataDept, departmentGrid, departmentStore)
                    }
                },
                {
                    text: 'Close',
                    formBind: false,
                    handler: function (btn, evt) {
                        window.destroy()
                    }
                }
            ]
        });
        window.show();
    });
    }


});
