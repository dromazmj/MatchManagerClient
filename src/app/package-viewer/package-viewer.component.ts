import { Component, OnInit, ViewChild } from '@angular/core';
import { SiperianObject } from '../models/siperianobject.model';
import { SiperianObjectService } from '../shared/siperian-object/siperian-object.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-package-viewer',
  templateUrl: './package-viewer.component.html',
  styleUrls: ['./package-viewer.component.scss']
})
export class PackageViewerComponent implements OnInit {

  public siperianObjects: SiperianObject[];
  loading: boolean = false;

  @ViewChild(DataTableDirective) 
  dtElement: DataTableDirective;
  dtOptions: any = {};

  tTrigger: Subject<any> = new Subject();

  rows: any;
  columns: any;

  constructor(
    private siperianObjectService: SiperianObjectService,
  ) { }

  ngOnInit() {
    this.setSiperianObjectsApi();
    this.dtOptions = {
      // Declare the use of the extension in the dom parameter
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
        'copy',
        'print',
        'excel',
        'pdf'
      ],
      colReorder: {
        order: [],
        // fixedColumnsRight: 2
      },
      drawCallback: (row: Node, data: any[] | Object, index: number) => {
        this.loading = false;
      },
      responsive: true
    };
  }

  showPackage($event) {
    this.loading = true;
    this.siperianObjectService.getPackageData($event.value.name).subscribe(data => {
      this.rows = data['data'];
      this.columns = data['columns'];
      let i = 0;
      this.dtOptions.colReorder.order = [];
      this.columns.forEach(element => {
        this.dtOptions.colReorder.order.push(i);
        i++;
      });
      if (this.dtElement.dtInstance == undefined) {
        this.tTrigger.next();
      }
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.tTrigger.next();
      });

    })
  }

  private setSiperianObjectsApi() {
    this.siperianObjectService.getSiperianObjects(localStorage.getItem("username"), localStorage.getItem("password")).subscribe((siperianObjects: SiperianObject[]) => {
      if (siperianObjects == null) {
        alert("ERROR RETREIVING DATA. PLEASE LOOK OVER LOGS FOR ERRORS");
        return;
      }
      this.siperianObjects = siperianObjects;
    })
  }

}
