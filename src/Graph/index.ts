import { Addon, Graph } from "@antv/x6";
import { initGraph } from "./initGraph";
import { initImgStencil, initStencil, initSystemStencil } from "./initStencil";

export default class FlowGraph {
    public static graph:Graph;
    public static stencil: Addon.Stencil;
    
    public static init(){
       this.graph = initGraph();
       this.stencil = initStencil(this.graph);

       initSystemStencil(this.graph);
       initImgStencil(this.graph)
       return {
           graph:this.graph,
           stencil:this.stencil
        };
    }
}