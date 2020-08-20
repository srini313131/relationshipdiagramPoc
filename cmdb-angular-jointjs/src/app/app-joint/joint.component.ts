import { Component, Input, ViewChild, ElementRef, OnInit, HostListener, AfterViewInit} from '@angular/core';
import * as joint from 'jointjs';
import dagre from 'dagre';
import graphlib from 'graphlib';
import {MenuItem} from 'primeng/api';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-joint',
  templateUrl: './app-joint.component.html',
  styles: []
})
export class JointComponent implements OnInit, AfterViewInit  {
  @ViewChild('wrapper') wrapperElement: ElementRef;
  @ViewChild('graph') graphElement: ElementRef;
  paper: any;
  graph: any;
  timer: any = null;
 display: boolean= false;
 CustomElement: any
    selectedNode: any;
    xCords: any;
    yCords: any;
    cellAddButtonClicked: boolean;
    relationshipForm:FormGroup;
    selectedCi: any;
//   ngOnInit() {
//     setTimeout(()=>{
//       this.graph = new joint.dia.Graph;
//       this.paper = new joint.dia.Paper({
//           el: this.graphElement.nativeElement,
//           model: this.graph,
//           gridSize: 20,
//           width: 1000,
//           height: 1000,
//           drawGrid: true,
//           interactive:true,
//           background: {
//               color: 'rgba(0, 255, 0, 0.1)'
//           }
//       } as any);

//        this.CustomElement = joint.dia.Element.define('examples.CustomElement', {
//         attrs: {
//             body: {
//                 refWidth: '100%',
//                 refHeight: '100%',
//             },
//             label: {
//                 textVerticalAnchor: 'middle',
//                 textAnchor: 'middle',
//                 refX: '50%',
//                 refY: '50%',
//                 fontSize: 14,
//             },
//             button: {
//               cursor: 'pointer',
//               ref: 'buttonLabel',
//               refWidth: '150%',
//               refHeight: '150%',
//               refX: '-25%',
//               refY: '-25%'
//           },
//             buttonLabel: {
//                 pointerEvents: 'none',
//                 refX: '100%',
//                 refY: 35,
//                 textAnchor: 'middle',
//                 text: '+',
//                 textVerticalAnchor: 'middle'
//             }
//         }
//       }, {
//         markup: [{
//             tagName: 'rect',
//             selector: 'body',
//         }, {
//             tagName: 'text',
//             selector: 'label'
//         }, {
//             tagName: 'rect',
//             selector: 'button'
//         }, {
//             tagName: 'text',
//             selector: 'buttonLabel'
//         }]
//       });
      
//       var firstElem = new this.CustomElement();
//       firstElem.position(20, 30);
//       firstElem.resize(300, 40);
//       firstElem.attr({
//           label: {
//               pointerEvents: 'none',
//               visibility: 'visible',
//               text: 'California United Bank Insurance Service Center',
//               fill: 'black'
//           },
//           body: {
//               cursor: 'default',
//               visibility: 'visible',
//               fill: '#8AECFF',
//               rx: 20,
//               ry: 20,
//               strokeWidth: 0
//           },
//           button: {
//               event: 'element:button:pointerdown',
//               fill: 'orange',
//               strokeWidth: 1,
//               visibility: 'hidden'
//           },
//           buttonLabel: {
//               text: 'ADD',
//               fill: 'black',
//               fontSize: 8,
//               fontWeight: 'bold',
//               visibility: 'hidden'
//           }
//       });
//       firstElem.addTo(this.graph);

//       var secondElem = new this.CustomElement();
//       secondElem.position(700, 30);
//       secondElem.resize(60, 40);
//       secondElem.attr({
//           label: {
//               pointerEvents: 'none',
//               visibility: 'visible',
//               text: 'Test',
//               fill: 'black'
//           },
//           body: {
//               cursor: 'default',
//               visibility: 'visible',
//               fill: '#FFEA61',
//               rx: 20,
//               ry: 20,
//               strokeWidth: 0
//           },
//           button: {
//               event: 'element:button:pointerdown',
//               fill: 'orange',
//               stroke: 'black',
//               strokeWidth: 1,
//               visibility: 'hidden'
//           },
//           buttonLabel: {
//               text: 'ADD',
//               fill: 'black',
//               fontSize: 8,
//               fontWeight: 'bold',
//               visibility: 'hidden'
//           }
//       });
//       secondElem.addTo(this.graph);
      
//       var thirdElem = new this.CustomElement();
//       thirdElem.position(500, 200);
//       thirdElem.resize(200, 40);
//       thirdElem.attr({
//           label: {
//               pointerEvents: 'none',
//               visibility: 'visible',
//               text: 'Premier Commercial Bank',
//               fill: 'black'
//           },
//           body: {
//               cursor: 'default',
//               visibility: 'visible',
//               fill: '#967bb6',
//               rx: 20,
//               ry: 20,
//               strokeWidth: 0
//           },
//           button: {
//               event: 'element:button:pointerdown',
//               fill: 'orange',
//               stroke: 'black',
//               strokeWidth: 1,
//               visibility: 'hidden'
//           },
//           buttonLabel: {
//               text: 'ADD',
//               fill: 'black',
//               fontSize: 8,
//               fontWeight: 'bold',
//               visibility: 'hidden'
//           }
//       });
//       thirdElem.addTo(this.graph);

//       var firstLink = new joint.shapes.standard.Link();
//       firstLink.source(firstElem);
//       firstLink.target(secondElem);
//       firstLink.attr({
//         line: { 
//             stroke: '#999999'
//         }
//       });
//       firstLink.labels([{
//           attrs: {
//               text: {
//                 text: 'Supports | Are part of |  Author of',
//                 textAnchor: 'middle',
//                 textVerticalAnchor: 'middle'
//               }
//           },
//           position: {
//             angle: 0,
//             args: {
//                 keepGradient: true
//             }
//         }
//       }]);
//       firstLink.addTo(this.graph);

//       var secondLink = new joint.shapes.standard.Link();
//       secondLink.source(firstElem);
//       secondLink.target(thirdElem);
//       secondLink.attr({
//         line: {
//             stroke: '#999999'
//         }
//       });
//       secondLink.labels([{
//         attrs: {
//             text: {
//                 text: 'Is written by | Consists of | Connected To'
//             }
//         },
//         position: {
//           angle: 0,
//           args: {
//               keepGradient: true
//           }
//         }
//       }]);
//       secondLink.addTo(this.graph);
 
//       //event handling
//       this.paper.on("cell:mouseenter", function(cellView) {
//         console.log(cellView.model);
//         var model = cellView.model;
//         model.attr('button/visibility', 'visible');
//         model.attr('buttonLabel/visibility', 'visible');
//       });
//       this.paper.on("cell:mouseleave", function(cellView) {
//         console.log(cellView.model);
//         var model = cellView.model;
//         model.attr('button/visibility', 'hidden');
//         model.attr('buttonLabel/visibility', 'hidden');
//       });
//       this.paper.on('element:button:pointerdown', function(elementView, evt) {
//         evt.stopPropagation();
//         console.log("this->>.", JointComponent)
//         this.display= true;
        
//         // alert('Open Side Window');
//     });
//   },3000);
//   }

ngOnInit(){
    this.relationshipForm= this.fb.group({
        sourceCi: [''],
        relationshipType: [''],
        destinationCi:['']
    })
}
constructor(private fb: FormBuilder){

}
ngAfterViewInit(){
this.createGraph();
}
  addCallBack(elementView, evt){
    evt.stopPropagation();
this.display= true  }

sidebarClose(){
    this.display= false;
}

private createGraph(){
    this.graph = new joint.dia.Graph;
      this.paper = new joint.dia.Paper({
          el: this.graphElement.nativeElement,
          model: this.graph,
          gridSize: 20,
          width: 1350,
          height: 1000,
          drawGrid: true,
          interactive:true,
          background: {
              color: 'rgba(0, 255, 0, 0.1)'
          }
      } as any);

       this.CustomElement = joint.dia.Element.define('CustomElement', {
        attrs: {
            body: {
                refWidth: '100%',
                refHeight: '100%',
            },
            label: {
                textVerticalAnchor: 'middle',
                textAnchor: 'middle',
                refX: '50%',
                refY: '50%',
                fontSize: 14,
            },
            button: {
              cursor: 'pointer',
              ref: 'buttonLabel',
              refWidth: '150%',
              refHeight: '150%',
              refX: '-25%',
              refY: '-25%'
          },
            buttonLabel: {
                pointerEvents: 'none',
                refX: '100%',
                refY: 35,
                textAnchor: 'middle',
                text: '+',
                textVerticalAnchor: 'middle'
            }
        }
      }, {
        markup: [{
            tagName: 'rect',
            selector: 'body',
        }, {
            tagName: 'text',
            selector: 'label'
        }, {
            tagName: 'rect',
            selector: 'button'
        }, {
            tagName: 'text',
            selector: 'buttonLabel'
        }]
      });
      
      var firstElem = new this.CustomElement();
      firstElem.position(20, 30);
      firstElem.resize(300, 40);
      firstElem.attr({
          label: {
              pointerEvents: 'none',
              visibility: 'visible',
              text: 'California United Bank Insurance Service Center',
              fill: 'black'
          },
          body: {
              cursor: 'default',
              visibility: 'visible',
              fill: '#8AECFF',
              rx: 20,
              ry: 20,
              strokeWidth: 0
          },
          button: {
              event: 'element:button:pointerdown',
              fill: 'orange',
              strokeWidth: 1,
              visibility: 'hidden'
          },
          buttonLabel: {
              text: 'ADD',
              fill: 'black',
              fontSize: 8,
              fontWeight: 'bold',
              visibility: 'hidden'
          }
      });
      firstElem.addTo(this.graph);

      var secondElem = new this.CustomElement();
      secondElem.position(700, 30);
      secondElem.resize(60, 40);
      secondElem.attr({
          label: {
              pointerEvents: 'none',
              visibility: 'visible',
              text: 'Test',
              fill: 'black'
          },
          body: {
              cursor: 'default',
              visibility: 'visible',
              fill: '#FFEA61',
              rx: 20,
              ry: 20,
              strokeWidth: 0
          },
          button: {
              event: 'element:button:pointerdown',
              fill: 'orange',
              stroke: 'black',
              strokeWidth: 1,
              visibility: 'hidden'
          },
          buttonLabel: {
              text: 'ADD',
              fill: 'black',
              fontSize: 8,
              fontWeight: 'bold',
              visibility: 'hidden'
          }
      });
      secondElem.addTo(this.graph);
      
      var thirdElem = new this.CustomElement();
      thirdElem.position(500, 200);
      thirdElem.resize(200, 40);
      thirdElem.attr({
          label: {
              pointerEvents: 'none',
              visibility: 'visible',
              text: 'Premier Commercial Bank',
              fill: 'black'
          },
          body: {
              cursor: 'default',
              visibility: 'visible',
              fill: '#967bb6',
              rx: 20,
              ry: 20,
              strokeWidth: 0
          },
          button: {
              event: 'element:button:pointerdown',
              fill: 'orange',
              stroke: 'black',
              strokeWidth: 1,
              visibility: 'hidden'
          },
          buttonLabel: {
              text: 'icon',
              fill: 'black',
              fontSize: 8,
              fontWeight: 'bold',
              visibility: 'hidden'
          }
      });
      thirdElem.addTo(this.graph);

      var firstLink = new joint.shapes.standard.Link();
      firstLink.source(firstElem);
      firstLink.target(secondElem);
      firstLink.attr({
        line: { 
            stroke: '#999999'
        }
      });
      firstLink.labels([{
          attrs: {
              text: {
                text: 'Supports | Are part of |  Author of',
                textAnchor: 'middle',
                textVerticalAnchor: 'middle'
              }
          },
          position: {
            angle: 0,
            args: {
                keepGradient: true
            }
        }
      }]);
      firstLink.addTo(this.graph);

      var secondLink = new joint.shapes.standard.Link();
      secondLink.source(firstElem);
      secondLink.target(thirdElem);
      secondLink.attr({
        line: {
            stroke: '#999999'
        }
      });
      secondLink.labels([{
        attrs: {
            text: {
                text: 'Is written by | Consists of | Connected To'
            }
        },
        position: {
          angle: 0,
          args: {
              keepGradient: true
          }
        }
      }]);
      secondLink.addTo(this.graph);
 
      //event handling
      this.paper.on("cell:mouseenter", (cellView)=> {
        console.log(cellView.model);
        var model = cellView.model;
        if(!this.cellAddButtonClicked) this.selectedNode= cellView.model;
        model.attr('button/visibility', 'visible');
        model.attr('buttonLabel/visibility', 'visible');
      });
    //   this.paper.on("cell:mouseleave", (cellView) =>{
    //     var model = cellView.model;
    //     if(!this.selectedNode)    this.selectedNode= cellView.model
     
    //     model.attr('button/visibility', 'hidden');
    //     model.attr('buttonLabel/visibility', 'hidden');
    //   });

      this.paper.on('element:button:pointerdown', ($event,cellView)=>{
          console.log("this", this.selectedNode.attributes.attrs.label.text, cellView.clientX, cellView.clientY);
            this.selectedCi= this.selectedNode.attributes.attrs.label.text
          this.cellAddButtonClicked= true;
          this.relationshipForm.get('sourceCi').patchValue(this.selectedNode.attributes.attrs.label.text)
          this.display= true;
          this.xCords= cellView.clientX;
          this.yCords= cellView.clientY
      });
}
cancel(){
    this.xCords= null;
    this.yCords= null;
    this.selectedNode=null;
    this.cellAddButtonClicked= false;
    this.display= false
}
save(){
    console.log("save called", this.selectedNode, this.xCords,this.yCords)
    this.display= false;
    let el = new this.CustomElement();
      el.position(this.xCords+100, this.yCords+30);
      el.resize(200, 40);
      el.attr({
          label: {
              pointerEvents: 'none',
              visibility: 'visible',
              text: 'sri',
              fill: 'black'
          },
          body: {
              cursor: 'default',
              visibility: 'visible',
              fill: 'red',
              rx: 20,
              ry: 20,
              strokeWidth: 0
          },
          button: {
              event: 'element:button:pointerdown',
              fill: 'orange',
              stroke: 'black',
              strokeWidth: 1,
              visibility: 'hidden'
          },
          buttonLabel: {
              text: 'icon',
              fill: 'black',
              fontSize: 8,
              fontWeight: 'bold',
              visibility: 'hidden'
          }
      });
      el.addTo(this.graph);
      var link = new joint.shapes.standard.Link();
      link.source(this.selectedNode);
      link.target(el);
      link.attr({
        line: {
            stroke: '#999999'
        }
      });
      link.labels([{
        attrs: {
            text: {
                text: 'Is written by | Consists of | Connected To'
            }
        },
        position: {
          angle: 0,
          args: {
              keepGradient: true
          }
        }
      }]);
      link.addTo(this.graph);
     this.cellAddButtonClicked= false;
}
}
