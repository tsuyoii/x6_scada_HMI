import { Cell, Graph, Shape } from "@antv/x6"
import ReactDOM from "react-dom";

export const initGraph = ()=> {
    const graph = new Graph({
        container: document.getElementById('container')!,
        grid: true,
        history:true,
        onToolItemCreated({ tool }) {
          const handle = tool as any
          const options = handle.options
          if (options && options.index % 2 === 1) {
            tool.setAttrs({ fill: 'red' })
          }
        },
        mousewheel: {
          enabled: true,
          zoomAtMousePosition: true,
          modifiers: "ctrl",
          minScale: 0.5,
          maxScale: 3
        },
        connecting: {
          router: {
            // name: "manhattan",
            // args: {
            //   padding: 1
            // }
            name: 'orth',
            args: {}
          },
          connector: {
            name: "rounded",
            args: {
              // radius: 8
              radius: 1
            }
          },
          anchor: "center",
          connectionPoint: "anchor",
          allowBlank: false,
          snap: {
            radius: 20
          },
          createEdge() {
            return new Shape.Edge({
              markup: [
                {
                  tagName: 'path',
                  selector: 'wrap',
                  groupSelector: 'lines',
                },
                {
                  tagName: 'path',
                  selector: 'line1',
                  groupSelector: 'lines',
                },
                {
                  tagName: 'path',
                  selector: 'line2',
                  groupSelector: 'lines',
                }
              ],
              attrs: {
                    lines: {
                      connection: true,
                      fill: 'none',
                      targetMarker: null,
                      strokeWidth: 2,
                    },
                    line1: {
                      stroke: '#ffffff',
                      targetMarker: null,
                      strokeWidth: 2,
                    },
                    line2: {
                      stroke: '#A2B1C3',
                      strokeWidth: 2,
                      strokeDashoffset: 8,
                      targetMarker: null,
                    },
              },
              tools: {
                name: 'segments',
                args: {
                  snapRadius: 20,
                  attrs: {
                    fill: '#444',
                  },
                },
              },
              zIndex: 0
            });
          },  
        // // 是否触发交互事件
        // validateMagnet({ magnet }) {
        //   return magnet.getAttribute('port-group') !== 'top'
        //   // return true
        // },               
        // // 显示可用的链接桩
        // validateConnection({
        //   sourceView,
        //   targetView,
        //   sourceMagnet,
        //   targetMagnet,
        // }) {
        //   // 不允许连接到自己
        //   if (sourceView === targetView) {
        //     return false
        //   }

        //   // 只能从输出链接桩创建连接
        //   if (
        //     !sourceMagnet ||
        //     sourceMagnet.getAttribute('port-group') === 'top'
        //   ) {
        //     return false
        //   }

        //   // 只能连接到输入链接桩
        //   if (
        //     !targetMagnet ||
        //     targetMagnet.getAttribute('port-group') !== 'top'
        //   ) {
        //     return false
        //   }
        //   return !!targetMagnet
        // },
        },
        highlighting: {
          magnetAdsorbed: {
            name: "stroke",
            args: {
              attrs: {
                fill: "#5F95FF",
                stroke: "#5F95FF"
              }
            }
          }
        },
        resizing: true,
        rotating: true,
        selecting: {
          enabled: true,
          rubberband: true,
          // rubberEdge: true,
          modifiers: 'shift',
          showNodeSelectionBox: true,
          // showEdgeSelectionBox: true,
        },
        panning: {
          enabled: true,
        },
        snapline: true,
        keyboard: {
          enabled: true,
        },
        clipboard: true,
    });
    // graph.drawBackground({
    //   color:'#fef8ef'
    // })
    initEvent(graph);
    initKeyboard(graph);
    return graph;
}

const initEvent = (graph:Graph)=> {
  const container = document.getElementById('container')!
  const showPorts = (show: boolean) => {
    const ports = container.querySelectorAll(
      ".x6-port-body"
    ) as NodeListOf<SVGElement>;
    for (let i = 0, len = ports.length; i < len; i = i + 1) {
      ports[i].style.visibility = show ? "visible" : "hidden";
    }
  };

  graph.on("node:mouseenter", () => {
    showPorts(true);
  });

  graph.on("node:mouseleave", () => {
    showPorts(false);
  });

  // 双击进入编辑模式
  graph.on('node:dblclick', ({ node, e }) => {
    node.addTools({
      name: 'node-editor',
      args: {
        event: e,
      },
    })
  })
  // graph.on('edge:dblclick', ({ cell, e }) => {
  //   cell.addTools({
  //     name: 'edge-editor',
  //     args: {
  //       event: e,
  //     },
  //   })
  // })
}

const initKeyboard = (graph:Graph) => {
  graph.bindKey(['meta+c', 'ctrl+c'], () => {
    const cells = graph.getSelectedCells()
    if (cells.length) {
      let childrenCell: Cell<Cell.Properties>[] = []
      cells.forEach(node=>{
        const children = node.getChildren();
        if(children){
          childrenCell = childrenCell.concat(children)
          graph.select(children)
        }
      })
      graph.copy([...cells,...childrenCell])
    }
    return false
  })

  graph.bindKey(['meta+x', 'ctrl+x'], () => {
    const cells = graph.getSelectedCells()
    if (cells.length) {
        graph.cut(cells)
    }
    return false
  })

  graph.bindKey(['meta+v', 'ctrl+v'], () => {
    const time = new Date().getTime()
    if (!graph.isClipboardEmpty()) {
      const cells = graph.paste({ offset: 32 })
      graph.cleanSelection()
      graph.select(cells)
    }
    return false
  })

  //undo redo
  graph.bindKey(['meta+z', 'ctrl+z'], () => {
    if (graph.history.canUndo()) {
        graph.history.undo()
    }
    return false
  })

  graph.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
    if (graph.history.canRedo()) {
        graph.history.redo()
    }
    return false
  })

  // select all
  graph.bindKey(['meta+a', 'ctrl+a'], () => {
    const nodes = graph.getNodes()
    if (nodes) {
        graph.select(nodes)
    }
  })

  //delete
  graph.bindKey('backspace', (e) => {
    const cells = graph.getSelectedCells()
    if(!(cells[0].hasTool('node-editor') || cells[0].hasTool('edge-editor'))){
      // 没有在编辑状态
      if (cells.length) {
          graph.removeCells(cells)
      }      
    }
  })

  // zoom
  graph.bindKey(['ctrl+1', 'meta+1'], () => {
    const zoom = graph.zoom()
    if (zoom < 1.5) {
        graph.zoom(0.1)
    }
  })

  graph.bindKey(['ctrl+2', 'meta+2'], () => {
    const zoom = graph.zoom()
    if (zoom > 0.5) {
        graph.zoom(-0.1)
    }
  })

  // 按下ALT键可以调整组合中的子节点
  graph.bindKey('alt',(e)=>{
    graph.getNodes().forEach(cell => {
      if(cell?.data?.parent){
        cell.toBack()
        cell.attr('body/fill','#ffdbc4')
        cell.attr('body/strokeWidth',1)
        cell.attr('body/strokeDasharray',5)
        cell.attr('body/stroke','orange')
      }
    })
  },'keydown')
  graph.bindKey('alt',(e)=>{
    graph.getNodes().forEach(cell => {
      if(cell?.data?.parent){
        cell.toFront()
        cell.attr('body/fill','transparent')
        cell.attr('body/strokeWidth',0)
      }
    })
  },'keyup')

  // shift+w键可以取消对齐线从而实现微调
  let gridSize = graph.getGridSize()
  graph.bindKey(['shift+w', 'shift+w'],(e)=>{
    graph.disableSnapline()
    graph.setGridSize(0.01)
  },'keydown')
  graph.bindKey(['shift+w', 'shift+w'],(e)=>{
    graph.enableSnapline()
    graph.setGridSize(gridSize)
  },'keyup')

  graph.on('node:change:size', ({ node, options }) => {
    if (options.skipParentHandler) {
      return
    }

    const children = node.getChildren()
    if (children && children.length) {
      node.prop('originSize', node.getSize())

    }
  })

  graph.on('node:change:position', ({ node, options }) => {
    if (options.skipParentHandler) {
      return
    }

    const children = node.getChildren()
    if (children && children.length) {
      node.prop('originPosition', node.getPosition())
    }

    const parent = node.getParent()
    if (parent && parent.isNode()) {
      let originSize = parent.prop('originSize')
      if (originSize == null) {
        originSize = parent.getSize()
        parent.prop('originSize', originSize)
      }

      let originPosition = parent.prop('originPosition')
      if (originPosition == null) {
        originPosition = parent.getPosition()
        parent.prop('originPosition', originPosition)
      }

      let x = originPosition.x
      let y = originPosition.y
      let cornerX = originPosition.x + originSize.width
      let cornerY = originPosition.y + originSize.height
      let hasChange = false

      const children = parent.getChildren()
      if (children) {
        children.forEach((child) => {
          const bbox = child.getBBox()
          const corner = bbox.getCorner()

          if (bbox.x < x) {
            x = bbox.x
            hasChange = true
          }

          if (bbox.y < y) {
            y = bbox.y
            hasChange = true
          }

          if (corner.x > cornerX) {
            cornerX = corner.x
            hasChange = true
          }

          if (corner.y > cornerY) {
            cornerY = corner.y
            hasChange = true
          }
        })
      }

      if (hasChange) {
        parent.prop(
          {
            position: { x, y },
            size: { width: cornerX - x, height: cornerY - y },
          },
          // Note that we also pass a flag so that we know we shouldn't
          // adjust the `originPosition` and `originSize` in our handlers.
          { skipParentHandler: true },
        )
      }
    }
  })


  // 单击选中边，拖拽时可以编辑边

  graph.on('edge:mouseenter', ({ cell }) => {
      cell.addTools([
        {
          name: 'source-arrowhead',
        },
        {
          name: 'target-arrowhead',
          args: {
            attrs: {
              fill: '#3399ff',
            },
          },
        },
        // { name: 'vertices' },
        // {
        //   name: 'button-remove',
        //   args: { distance: 20  },
        // },
        // { name: 'segments'},
      ])
      
  })
  
  graph.on('edge:mouseleave', ({ cell }) => {
      cell.removeTools([
        {
          name: 'source-arrowhead',
        },
        {
          name: 'target-arrowhead',
        },
      ])
  })

  // graph.on('edge:contextmenu', ({ cell }) => {
  //   console.log('右键边')
  //   cell.addTools([
  //     { name: 'vertices' },
  //     { name: 'segments'},
  //   ])
  // })

  // graph.on('edge:added', ({ edge }) => {
  //   if(!edge.getVertices().length){
  //     // edge.setVertices([edge.getSourcePoint(),edge.getTargetPoint()])
  //     edge.setVertices(edge.getSourcePoint())
  //   }
  // })

  graph.on('edge:click', ({ cell }) => {
    graph.select(cell);
    // if(!cell.getVertices().length){
    //   cell.setVertices([cell.getSourcePoint(),cell.getTargetPoint()])
    // }
    cell.addTools([
      // { name: 'vertices' },
      { name: 'vertices',
        args: [
          {x:40,y:40}
        ]
      },
      {
        name:'boundary',
        args:[
          {
            fill: 'black',
            stroke: 'orange',
          }
        ]
      },
      { name: 'segments'},
    ])
  })
  graph.on('edge:unselected', ({ cell }) => {
    cell.removeTools()
  })

  const menu = document.getElementById('contextMenu');
  graph.on('node:contextmenu',({cell,e}) => {
    const selected = graph.getSelectedCells();
    if(!selected.includes(cell)){
      graph.unselect(graph.getSelectedCells())
    }
    graph.select(cell)
    if(menu){
      menu.style.display = 'block';
      menu.style.top = e.clientY+10+ 'px';
      menu.style.left = e.clientX -10 + 'px';
    }
  })

  graph.on('blank:contextmenu',({e}) => {
    if(menu){
      menu.style.display = 'block';
      menu.style.top = e.clientY+10+ 'px';
      menu.style.left = e.clientX -10 + 'px';
    }
  })

  graph.on('blank:mousedown',({e}) => {
    graph.unselect(graph.getSelectedCells())
    if(menu){
      menu.style.display = 'none';
    }
  })

  // 选中组合的节点时，将所有该组合的节点都选中
  // graph.on('node:selected',({node})=>{
  //   if(node && node.getProp('combine')){
  //     //如果属于组合
  //     // const combine = node.getParent()
  //     // graph.select(combine?.children)

  //     // graph.getNodes().forEach((item) => {
  //     //   const combine = item.getProp('combine')
  //     //   if (combine && combine === node.getProp('combine')) {
  //     //     // 同一个组合的节点
  //     //     graph.select(item)
  //     //   }
  //     // })  
  //     // node.getParent()?.toFront();    
  //   }
  // })


}