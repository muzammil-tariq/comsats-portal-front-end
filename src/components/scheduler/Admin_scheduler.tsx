import * as React from "react";
import { extend } from "@syncfusion/ej2-base";
import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";
import { ItemModel } from "@syncfusion/ej2-navigations";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  ActionEventArgs,
  ExcelExport,
  DragAndDrop,
  Resize,
  ExportOptions,
  ExportFieldInfo,
} from "@syncfusion/ej2-react-schedule";

export default function Scheduler() {
  let scheduleObj: { exportToExcel: (arg0: ExportOptions) => void };
  const dataManager: DataManager = new DataManager({
    url: "https://ej2services.syncfusion.com/production/web-services/api/Schedule",
    adaptor: new WebApiAdaptor(),
    crossDomain: true,
  });
  function onActionFailure() {
    const span = document.createElement("span");
    span.style.color = "#FF0000";
    span.innerHTML = "Server exception: 404 Not found";
  }
  const actionBegin = (args: ActionEventArgs) => {
    // if (args.requestType === "toolbarItemRendering") {
    const exportItem: ItemModel = {
      align: "Right",
      showTextOn: "Both",
      prefixIcon: "e-icons e-export-excel",
      text: "Excel Export",
      cssClass: "e-excel-export",
      click: onExportClick,
    };
    args.data?.push(exportItem);
    // }
  };

  function onExportClick(): void {
    const exportFields: ExportFieldInfo[] = [
      { name: "Id", text: "Id" },
      { name: "Subject", text: "Summary" },
      { name: "StartTime", text: "Start Date" },
      { name: "EndTime", text: "End Date" },
      { name: "Location", text: "Place" },
    ];
    const exportValues: ExportOptions = { fieldsInfo: exportFields };
    scheduleObj.exportToExcel(exportValues);
  }
  return (
    <div className="schedule-control-section">
      <div className="col-lg-12 control-section">
        <div className="control-wrapper" style={{ color: "text.secondry" }}>
          <ScheduleComponent
            actionFailure={onActionFailure.bind}
            allowDragAndDrop={true}
            height="750px"
            selectedDate={new Date(2021, 0, 10)}
            // eventSettings={{ dataSource: dataManager }}
            // actionBegin={actionBegin.bind}
          >
            <Inject
              services={[Day, WorkWeek, Month, Agenda, Week, Resize, DragAndDrop, ExcelExport]}
            />
          </ScheduleComponent>
        </div>
      </div>
    </div>
  );
}
