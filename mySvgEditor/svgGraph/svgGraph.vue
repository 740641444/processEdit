<template>
  <div class="svgGraphBox" :style="graphConfig">
      <svg ref="svgGraph" class="svgGraph"  :style="graphConfig" oncontextmenu = "return false">
          <!-- 背景点 -->
            <circle v-for="(item,index) in backgroundCirArr" :key="'bg_circle' + index" :cx="item.x" :cy="item.y" :r="item.r" :fill="item.fillColor" style=""/>
            <g>
                <!-- 虚拟边 -->
                <!-- <path v-if="fakeEdges.id" fill="none" stroke="#5A6BDF" stroke-width="2" :d="setFakeEdges(fakeEdges)"></path> -->
                <path  v-if="fakeEdges.isShow" fill="none" stroke="#5A6BDF" stroke-width="2" :d="'M'+fakeEdges.source.x+' '+fakeEdges.source.y+' L'+fakeEdges.target.x+' '+ fakeEdges.target.y"></path>

            </g>
            <!-- nodes节点 -->
            <g v-for="(node,index) in nodes" :key="'nodes' + index" class="nodeBox" :transform="'translate(' + (node.x) +  ',' + (node.y) + ')'" @mousedown="nodemousedown($event,node)" @contextmenu="nodecontextmenu($event,node,'node')" @dblclick="nodedblclick($event,node,'node')" @mouseup="nodemouseup($event,node)">
                <!-- <polygon v-if="nodes.shape == 'nodeNormal'"  /> -->
                <!-- 人工活动 --> 
                <g v-if="node.shape == 'nodeNormal'" :transform="'translate(-60,-32)'">
                    <defs>
                        <linearGradient id="nodeNormalGradient" x1="50%" y1="0" x2="50%" y2="100%">
                            <stop offset="0%"  stop-color="#967CF8"/>
                            <stop offset="100%" stop-color="#B4A0FF"/>
                        </linearGradient>
                    </defs>
                    <path d="M120 0 L120 49 A15, 15 0 0 ,1 105, 64 L0 64 L0 15 A15,15 0 0,1 15 0 Z " stroke="url(#nodeNormalGradient)" stroke-width="2" fill="rgba(255,255,255,0.6)" />
                    <!-- <path d="M120 0 L120 49 A15 15 0 0 0 115 49 L115 64 L0 64 A15 15 0 0 0 0 15 L15 0 Z" stroke="red" fill="none" /> -->
                    <!-- <rect v-if="nodes.shape == 'nodeNormal'" x="0" y="0"  width="120" height="64" fill="red"/> -->
                    <text x="60" y="26" font-size="14px" fill="#303133" text-anchor="middle">{{node.data.labelArr[0]}}</text>
                    <text x="60" y="46" font-size="14px" fill="#303133" text-anchor="middle">{{node.data.labelArr[1]}}</text>
                    
                    <!-- 4个链接桩 -->
                    <circle class="pointCircleBox" @mousedown.stop="pointmousedown($event,node,'top')" cx="60" cy="0" r="4" stroke="#4381E6" stroke-width="2" fill="rgba(255,255,255,1)"/>
                    <circle class="pointCircleBox" @mousedown.stop="pointmousedown($event,node,'right')" cx="120" cy="32" r="4" stroke="#4381E6" stroke-width="2" fill="rgba(255,255,255,1)"/>
                    <circle class="pointCircleBox" @mousedown.stop="pointmousedown($event,node,'bottom')" cx="60" cy="64" r="4" stroke="#4381E6" stroke-width="2" fill="rgba(255,255,255,1)"/>
                    <circle class="pointCircleBox" @mousedown.stop="pointmousedown($event,node,'left')" cx="0" cy="32" r="4" stroke="#4381E6" stroke-width="2" fill="rgba(255,255,255,1)"/>
                </g>
                <!-- 路由 --> 
                <g v-if="node.shape == 'nodeRouter'" :transform="'translate(-60,-32)'">
                    <defs>
                        <linearGradient id="nodeRouterGradient" x1="50%" y1="0" x2="50%" y2="100%">
                            <stop offset="0%"  stop-color="#35B1FF"/>
                            <stop offset="100%" stop-color="#3FD5FF"/>
                        </linearGradient>
                    </defs>
                    <rect x="0" y="0" rx="8" ry="8" width="120" height="64" stroke="url(#nodeRouterGradient)" stroke-width="2" fill="rgba(255,255,255,0.6)"/>
                    <text x="60" y="26" font-size="14px" fill="#303133" text-anchor="middle">{{node.data.labelArr[0]}}</text>
                    <text x="60" y="46" font-size="14px" fill="#303133" text-anchor="middle">{{node.data.labelArr[1]}}</text>
                    <!-- 4个链接桩 -->
                    <circle class="pointCircleBox" @mousedown.stop="pointmousedown($event,node,'top')" cx="60" cy="0" r="4" stroke="#4381E6" stroke-width="2" fill="rgba(255,255,255,1)"/>
                    <circle class="pointCircleBox" @mousedown.stop="pointmousedown($event,node,'right')" cx="120" cy="32" r="4" stroke="#4381E6" stroke-width="2" fill="rgba(255,255,255,1)"/>
                    <circle class="pointCircleBox" @mousedown.stop="pointmousedown($event,node,'bottom')" cx="60" cy="64" r="4" stroke="#4381E6" stroke-width="2" fill="rgba(255,255,255,1)"/>
                    <circle class="pointCircleBox" @mousedown.stop="pointmousedown($event,node,'left')" cx="0" cy="32" r="4" stroke="#4381E6" stroke-width="2" fill="rgba(255,255,255,1)"/>
                </g>
                <!-- 逻辑判断 --> 
                <g v-if="node.shape == 'nodeLogicJudge'" :transform="'translate(-60,-50)'">
                <!-- <g v-if="node.shape == 'nodeNormal'"> -->
                    <defs>
                        <linearGradient id="nodeLogicJudgeGradient" x1="50%" y1="0" x2="50%" y2="100%">
                            <stop offset="0%"  stop-color="#EB7549"/>
                            <stop offset="100%" stop-color="#FFA684"/>
                        </linearGradient>
                    </defs>
                    <!-- <rect x="0" y="0" rx="8" ry="8" width="120" height="64" stroke="url(#nodeLogicJudgeGradient)" stroke-width="2" fill="rgba(255,255,255,0.6)"/> -->
                    <path d="M60 0 L120 50 L60 100 L0 50 Z " stroke="url(#nodeLogicJudgeGradient)" stroke-width="2" fill="rgba(255,255,255,0.6)" />
                    <text x="60" y="45" font-size="14px" fill="#303133" text-anchor="middle">{{node.data.labelArr[0]}}</text>
                    <text x="60" y="65" font-size="14px" fill="#303133" text-anchor="middle">{{node.data.labelArr[1]}}</text>
                    <!-- 4个链接桩 -->
                    <circle class="pointCircleBox" @mousedown.stop="pointmousedown($event,node,'top')" cx="60" cy="0" r="4" stroke="#4381E6" stroke-width="2" fill="rgba(255,255,255,1)"/>
                    <circle class="pointCircleBox" @mousedown.stop="pointmousedown($event,node,'right')" cx="120" cy="50" r="4" stroke="#4381E6" stroke-width="2" fill="rgba(255,255,255,1)"/>
                    <circle class="pointCircleBox" @mousedown.stop="pointmousedown($event,node,'bottom')" cx="60" cy="100" r="4" stroke="#4381E6" stroke-width="2" fill="rgba(255,255,255,1)"/>
                    <circle class="pointCircleBox" @mousedown.stop="pointmousedown($event,node,'left')" cx="0" cy="50" r="4" stroke="#4381E6" stroke-width="2" fill="rgba(255,255,255,1)"/>
                </g>
                <!-- 合并 --> 
                <g v-if="node.shape == 'nodeMerge'" :transform="'translate(-60,-32)'">
                <!-- <g v-if="node.shape == 'nodeNormal'"> -->
                    <defs>
                        <linearGradient id="nodeMergeGradient" x1="50%" y1="0" x2="50%" y2="100%">
                            <stop offset="0%"  stop-color="#3ED862"/>
                            <stop offset="100%" stop-color="#8DF0A4"/>
                        </linearGradient>
                    </defs>
                    <!-- <rect x="0" y="0" rx="8" ry="8" width="120" height="64" stroke="url(#nodeLogicJudgeGradient)" stroke-width="2" fill="rgba(255,255,255,0.6)"/> -->
                    <path d="M0 0 L120 0 L110 64 L10 64 Z " stroke="url(#nodeMergeGradient)" stroke-width="2" fill="rgba(255,255,255,0.6)" />
                    <text x="60" y="26" font-size="14px" fill="#303133" text-anchor="middle">{{node.data.labelArr[0]}}</text>
                    <text x="60" y="46" font-size="14px" fill="#303133" text-anchor="middle">{{node.data.labelArr[1]}}</text>
                    <!-- 4个链接桩 -->
                    <circle class="pointCircleBox" @mousedown.stop="pointmousedown($event,node,'top')" cx="60" cy="0" r="4" stroke="#4381E6" stroke-width="2" fill="rgba(255,255,255,1)"/>
                    <circle class="pointCircleBox" @mousedown.stop="pointmousedown($event,node,'right')" cx="120" cy="32" r="4" stroke="#4381E6" stroke-width="2" fill="rgba(255,255,255,1)"/>
                    <circle class="pointCircleBox" @mousedown.stop="pointmousedown($event,node,'bottom')" cx="60" cy="64" r="4" stroke="#4381E6" stroke-width="2" fill="rgba(255,255,255,1)"/>
                    <circle class="pointCircleBox" @mousedown.stop="pointmousedown($event,node,'left')" cx="0" cy="32" r="4" stroke="#4381E6" stroke-width="2" fill="rgba(255,255,255,1)"/>
                </g>
                <!-- 子图 --> 
                <g v-if="node.shape == 'nodeSubFlow'" :transform="'translate(-60,-32)'">
                <!-- <g v-if="node.shape == 'nodeNormal'"> -->
                    <defs>
                        <linearGradient id="nodeSubFlowGradient" x1="50%" y1="0" x2="50%" y2="100%">
                            <stop offset="0%"  stop-color="#FFDE00"/>
                            <stop offset="100%" stop-color="#FAE65A"/>
                        </linearGradient>
                    </defs>
                    <rect x="0" y="0" rx="32" ry="32" width="120" height="64" stroke="url(#nodeSubFlowGradient)" stroke-width="2" fill="rgba(255,255,255,0.6)"/>
                    <text x="60" y="26" font-size="14px" fill="#303133" text-anchor="middle">{{node.data.labelArr[0]}}</text>
                    <text x="60" y="46" font-size="14px" fill="#303133" text-anchor="middle">{{node.data.labelArr[1]}}</text>
                    <!-- 4个链接桩 -->
                    <circle class="pointCircleBox" @mousedown.stop="pointmousedown($event,node,'top')" cx="60" cy="0" r="4" stroke="#4381E6" stroke-width="2" fill="rgba(255,255,255,1)"/>
                    <circle class="pointCircleBox" @mousedown.stop="pointmousedown($event,node,'right')" cx="120" cy="32" r="4" stroke="#4381E6" stroke-width="2" fill="rgba(255,255,255,1)"/>
                    <circle class="pointCircleBox" @mousedown.stop="pointmousedown($event,node,'bottom')" cx="60" cy="64" r="4" stroke="#4381E6" stroke-width="2" fill="rgba(255,255,255,1)"/>
                    <circle class="pointCircleBox" @mousedown.stop="pointmousedown($event,node,'left')" cx="0" cy="32" r="4" stroke="#4381E6" stroke-width="2" fill="rgba(255,255,255,1)"/>
                </g>
                <!-- 开始 --> 
                <g v-if="node.shape == 'nodeBegin'" :transform="'translate(-32,-32)'">
                <!-- <g v-if="node.shape == 'nodeNormal'"> -->
                    <circle cx="32" cy="32" r="32" stroke="#5A6BDF" stroke-width="2" fill="rgba(255,255,255,0.6)"/>
                    <text x="32" y="36" font-size="14px" fill="#303133" text-anchor="middle">{{node.data.label}}</text>
                    <!-- 4个链接桩 -->
                    <circle class="pointCircleBox" @mousedown.stop="pointmousedown($event,node,'top')" cx="32" cy="0" r="4" stroke="#4381E6" stroke-width="2" fill="rgba(255,255,255,1)"/>
                    <circle class="pointCircleBox" @mousedown.stop="pointmousedown($event,node,'right')" cx="64" cy="32" r="4" stroke="#4381E6" stroke-width="2" fill="rgba(255,255,255,1)"/>
                    <circle class="pointCircleBox" @mousedown.stop="pointmousedown($event,node,'bottom')" cx="32" cy="64" r="4" stroke="#4381E6" stroke-width="2" fill="rgba(255,255,255,1)"/>
                    <circle class="pointCircleBox" @mousedown.stop="pointmousedown($event,node,'left')" cx="0" cy="32" r="4" stroke="#4381E6" stroke-width="2" fill="rgba(255,255,255,1)"/>
                </g>
                <!-- 结束  -->
                <g v-if="node.shape == 'nodeEnd'" :transform="'translate(-32,-32)'">
                <!-- <g v-if="node.shape == 'nodeNormal'"> -->
                    <circle cx="32" cy="32" r="32" stroke="#5A6BDF" stroke-width="2" fill="rgba(255,255,255,0.6)"/>
                    <text x="32" y="36" font-size="14px" fill="#303133" text-anchor="middle">{{node.data.label}}</text>
                    <!-- 4个链接桩 -->
                    <circle class="pointCircleBox" @mousedown.stop="pointmousedown($event,node,'top')" cx="32" cy="0" r="4" stroke="#4381E6" stroke-width="2" fill="rgba(255,255,255,1)"/>
                    <circle class="pointCircleBox" @mousedown.stop="pointmousedown($event,node,'right')" cx="64" cy="32" r="4" stroke="#4381E6" stroke-width="2" fill="rgba(255,255,255,1)"/>
                    <circle class="pointCircleBox" @mousedown.stop="pointmousedown($event,node,'bottom')" cx="32" cy="64" r="4" stroke="#4381E6" stroke-width="2" fill="rgba(255,255,255,1)"/>
                    <circle class="pointCircleBox" @mousedown.stop="pointmousedown($event,node,'left')" cx="0" cy="32" r="4" stroke="#4381E6" stroke-width="2" fill="rgba(255,255,255,1)"/>
                </g>
            </g>
            <!-- 边节点 -->
            <g v-for="(edge,index) in edges" :key="'edges' + index" class="edgeBox" @contextmenu="nodecontextmenu($event,edge,'edge')">
                <!-- <polyline fill="none" stroke="#5A6BDF" :points="`${edge.sourceObj.x} ${edge.sourceObj.y},${edge.targetObj.x} ${edge.targetObj.y}`"></polyline> -->
                <!-- <polyline fill="none" stroke="#5A6BDF" :points="setEdgePointsFn(edge)"></polyline> -->
                <!-- <path fill="none" stroke="#5A6BDF" d="M442 244.8 L 442 244.8 L 442 254.8 L 445.59999999999997 258.4 L 445.59999999999997 268.4"></path> -->
                <path fill="none" stroke="#5A6BDF" stroke-width="2" :d="setEdgePointsFn(edge)"></path>

                <!-- 三角形 -->
                <!-- <path v-if="edge.triangle" fill="#5A6BDF" stroke="#5A6BDF" :d="edge.triangle.d" @mousedown="edgeTrianglemousedown($event,edge)" /> -->
                <path v-if="edge.triangle" fill="#5A6BDF" stroke="#5A6BDF" :d="edge.triangle.d" @mousedown="edgeTrianglemousedown($event,edge)" />
                <!-- <path v-if="edge.triangle" fill="#5A6BDF" stroke="#5A6BDF" :d="'M'+edge.triangle.x+' '+edge.triangle.y+' L'+(edge.triangle.x-7)+' '+(edge.triangle.y-4)+' L'+(edge.triangle.x-7)+' '+(edge.triangle.y+4)+' Z'" @mousedown="edgeTrianglemousedown($event,edge)" /> -->
            </g>

        </svg>
  </div>
</template>

<script>
export default {
    props: ['myCanvasEditor_graph','rightClickMenu'],//画布元素、菜单元素
    data() {
        return {
            configData: {},//配置信息
            cell: [],//所有节点
            nodes: [],//
            edges: [],//
            fakeEdges:{//虚拟边-用于节点交互
                id: '',
                source: {
                    x: 100,
                    y: 100
                },
                target: {
                    x: 200,
                    y: 200
                },
                sourceObj: {},
                isShow: false
            },
            graphConfig: {//画布配置
                width: '2000px',
                height: '2000px',
                offsetX: 100,//偏移量
                offsetY: 100,//偏移量
            },
            backgroundCirArr: [],//背景点
            nodeShape: {//节点类型
                nodeNormal: {//人工活动-一对圆角
                    height: 64,
                    width: 120,
                    borderColor: '#967CF8',
                    borderColorLinearGradientFlag: true,//是否开启边框颜色渐变
                    borderColorLinearGradient: {
                        start: '#967CF8',
                        // start: 'red',
                        end: '#B4A0FF',
                        // end: 'blue'
                    },
                    borderRadius: 15,//圆角
                    backgroundColor: "rgba(255,255,255,0.6)",
                    fontColor: "#303133"
                },
                nodeRouter: {//路由节点
                    height: 64,
                    width: 120,
                },
                nodeLogicJudge: {//逻辑判断
                    height: 100,
                    width: 120,
                },
                nodeMerge: {//合并
                    height: 64,
                    width: 120,
                },
                nodeSubFlow: {//子流程
                    height: 64,
                    width: 120,
                },
                nodeBegin: {//开始
                    height: 64,
                    width: 64,
                },
                nodeEnd: {//结束
                    height: 64,
                    width: 64,
                },
            }
        }
    },
    methods: {
        // 添加节点
        addNode(node) {
            // console.log("进来了节点",node)
            // console.log("添加节点",node.shape,this.data.nodeShape)
            // let currentShape = 
            let reData ={};
            
            if (!this.nodeShape[node.shape]) {//判断是否注册节点
                reData = "没有节点"
                return reData
            }
            // node.x += this.graphConfig.offsetX;
            // node.y += this.graphConfig.offsetY;
            // 设置两行字
            this.setNodeLabel(node);
            // if (node.shape == 'nodeNormal') {//人工节点类型的节点
            //     node.style = this.nodeShape[node.shape];//获取对应节点类型的样式
            //     this.setNodeLabel(node);
            //     // this.addnodeNormal(node);
            // }
            

            this.nodes.push(node);//记录画布中节点
            this.cell.push(node);//记录画布中所有
            // console.log("符合条件的节点",this.nodes,this.cell)
            // console.log("已添加节点")
            reData = "有节点"
            return reData
        },
        // 修改字的行
        setNodeLabel(node) {
            // console.log("修改字的行",node)
            let local = Math.floor(node.data.label.length/2)
            let labelArr = [];
            labelArr.push(node.data.label.substring(0,local))
            labelArr.push(node.data.label.substring(local,node.data.label.length))
            node.data.labelArr = labelArr;
            // console.log("ka",newArr)
        },
        // 拖拽生成新节点
        toolbarAddNode(item,e) {
            // console.log("调入",item,e,this.$refs.svgGraph)
            let newId = "node" + this.getUUID();
            let disX = e.clientX - this.$refs.svgGraph.getBoundingClientRect().left;
            let disY = e.clientY - this.$refs.svgGraph.getBoundingClientRect().top;
            let newNode = {
                "id": newId,
                "shape": item.nodeType,
                "x": disX,
                "y": disY,
                "data": {
                    "id": newId,
                    "label": item.nodeLabel,
                    "nodetype": item.nodeType,
                    "type": "node",
                    "x": disX,
                    "y": disY
                },
            }
            // console.log("新节点",newNode)
            this.addNode(newNode);
            // console.log("新节点",this.nodes)
            this.nodemousedown(e,newNode);
            // 生成新节点后-提交修改状态-新增节点
            this.$emit('isEditChange',{hand:"nodeAdd"})
            // this.isEditChange({hand:"addNode"})
        },
        // 链接桩按下
        pointmousedown(event,node,type) {
            let thisIn = this;
            // console.log("链接桩按下",event,node,type)
            // let newEdgeId = this.getUUID()
            let xxx="";
            let yyy="";

            if (type == 'left') {
                xxx = node.x - this.nodeShape[node.shape].width/2;
                yyy = node.y;
            } else if (type == 'right') {
                xxx = node.x + this.nodeShape[node.shape].width/2;
                yyy = node.y;
            } else if (type == 'top') {
                xxx = node.x;
                yyy = node.y - this.nodeShape[node.shape].height/2;
            } else if (type == 'bottom') {
                xxx = node.x;
                yyy = node.y + this.nodeShape[node.shape].height/2;
            }
            this.fakeEdges.isShow = true;
            // this.fakeEdges.id = newEdgeId;
            this.fakeEdges.source.x = xxx;
            this.fakeEdges.source.y = yyy;
            this.fakeEdges.target.x = xxx;
            this.fakeEdges.target.y = yyy;
            this.fakeEdges.sourceObj = node;
            // this.fakeEdges.id = newEdgeId;
            // this.fakeEdges = {
            //     id: newEdgeId,
            //     source: {
            //     },
            //     target: {
            //         x: xxx,
            //         y: yyy
            //     },
            //     sourceObj: node,
            //     isShow: true
            // }
            // this.fakeEdges.
            // return
            //算出鼠标相对元素的位置
            let disX = event.clientX - xxx;
            let disY = event.clientY - yyy;
            document.onmousemove = (e)=>{       //鼠标按下并移动的事件
            // console.log("鼠标按下后边移动")
                // let left = e.clientX - disX;    
                // let top = e.clientY - disY;
                //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                // console.log("getScrollLoc",thisIn.getScrollLoc())
                let left = e.clientX + thisIn.getScrollLoc().scrollX +1;    
                let top = e.clientY + thisIn.getScrollLoc().scrollY +1;
                // let left = e.clientX;    
                // let top = e.clientY;
                // console.log("lslsls",left,top)
                thisIn.fakeEdges.target.x = left;
                thisIn.fakeEdges.target.y = top;
                console.log("9988",thisIn.fakeEdges.isShow)
            };
            document.onmouseup = (e) => {
                // console.log("鼠标抬起",e)
                // thisIn.nodemouseup(e,thisIn.fakeEdges)
                
                thisIn.fakeEdges.isShow = false;
                document.onmousemove = null;
                document.onmouseup = null;
            };
        },
        // 虚拟边
        setFakeEdges(fakeEdges) {
            let newArr = [];
            newArr.push(["M",fakeEdges.source.x,fakeEdges.source.y,].join(" "))
            newArr.push(["L",fakeEdges.source.x,fakeEdges.source.y,].join(" "))
            return newArr.join(" ")
        },
        // node鼠标抬起
        nodemouseup(event,node) {
            // console.log("vue鼠标抬起事件",event,node,this.fakeEdges)
            // 鼠标抬起-生成边
            if (this.fakeEdges.isShow) {
                this.fakeEdges.isShow=false;
                if (this.fakeEdges.sourceObj.id == node.id) {
                    return
                }
                this.addEdge({
                    id: this.getUUID(),
                    tools: ['vertices'],
                    shape: 'edge',
                    // label:112233,
                    source: {
                        cell: this.fakeEdges.sourceObj.id
                    },
                    target: {
                        cell: node.id
                    },
                    data:  node,
                })
                // 生成新节点后-提交修改状态-新增边
                this.$emit('isEditChange',{hand:"edgeAdd"})
                // this.fakeEdges.
            }
        },
        // 添加边edge节点
        addEdge(node) {
            let reData ={};
            node.source = typeof node.source == 'string' ? {
                cell: node.source
            } : node.source;
            node.target = typeof node.target == 'string' ? {
                cell: node.target
            } : node.target;

            // console.log("看看找到的两个节点",node)
            let source = {};
            let target = {};
            for (let item of this.nodes) {
                if (item.id == node.source.cell) {
                    source = item
                }
                if (item.id == node.target.cell) {
                    target = item
                }
            }
            source.x = source.x ? source.x : 0;
            source.y = source.y ? source.y : 0;
            target.x = target.x ? target.x : 0;
            target.y = target.y ? target.y : 0;
            // console.log("看看找到的两个节点",source,target)
            node.sourceObj = source;
            node.targetObj = target;

            // console.log("看看找到的两个节点",node,source,target)
            this.edges.push(node);//记录画布中边节点
            this.cell.push(node);//记录画布中所有
            
            // console.log("符合条件的edge节点",this.nodes)
            reData = "有节点"
            return reData
        },
        // 生成边-
        setEdgePointsFn(edge) {
            // console.log("生成的边",edge)
            let locationRelation = this.getlocationRelation(edge);//获取位置关系
            let sourceObjPoint = {
                x: 0,
                y: 0,
            }
            let targetObjPoint = {
                x: 0,
                y: 0,
            }
            let reData = [];
            let portDis = 5;
            let portOffset = 10;
            // console.log("???",locationRelation)
            // 设置起始节点坐标
            if (locationRelation.sourceObj == 'top') {
                sourceObjPoint.x = edge.sourceObj.x;
                sourceObjPoint.y = edge.sourceObj.y - this.nodeShape[edge.sourceObj.shape].height/2 - portDis;
                reData.push(["M",sourceObjPoint.x,sourceObjPoint.y].join(' '))
                reData.push(["L",sourceObjPoint.x,sourceObjPoint.y].join(' '))
                reData.push(["L",sourceObjPoint.x,sourceObjPoint.y - portOffset].join(' '))
            } else if (locationRelation.sourceObj == 'bottom') {
                sourceObjPoint.x = edge.sourceObj.x;
                sourceObjPoint.y = edge.sourceObj.y + this.nodeShape[edge.sourceObj.shape].height/2 + portDis;
                reData.push(["M",sourceObjPoint.x,sourceObjPoint.y].join(' '))
                reData.push(["L",sourceObjPoint.x,sourceObjPoint.y].join(' '))
                reData.push(["L",sourceObjPoint.x,sourceObjPoint.y + portOffset].join(' '))
            } else if (locationRelation.sourceObj == 'left') {
                sourceObjPoint.x = edge.sourceObj.x - this.nodeShape[edge.sourceObj.shape].width/2 - portDis;
                sourceObjPoint.y = edge.sourceObj.y;
                reData.push(["M",sourceObjPoint.x,sourceObjPoint.y].join(' '))
                reData.push(["L",sourceObjPoint.x,sourceObjPoint.y].join(' '))
                reData.push(["L",sourceObjPoint.x - portOffset,sourceObjPoint.y].join(' '))
            } else if (locationRelation.sourceObj == 'right') {
                sourceObjPoint.x = edge.sourceObj.x + this.nodeShape[edge.sourceObj.shape].width/2 + portDis;
                sourceObjPoint.y = edge.sourceObj.y;
                reData.push(["M",sourceObjPoint.x,sourceObjPoint.y].join(' '))
                reData.push(["L",sourceObjPoint.x,sourceObjPoint.y].join(' '))
                reData.push(["L",sourceObjPoint.x + portOffset,sourceObjPoint.y].join(' '))
            }
            // 设置终止坐标
            if (locationRelation.targetObj == 'top') {
                targetObjPoint.x = edge.targetObj.x;
                targetObjPoint.y = edge.targetObj.y - this.nodeShape[edge.targetObj.shape].height/2 - portDis;
                reData.push(["L",targetObjPoint.x,targetObjPoint.y - portOffset].join(' '))
                reData.push(["L",targetObjPoint.x,targetObjPoint.y].join(' '))
                // this.$set(edge,"triangle",this.drowSanjiao({x:targetObjPoint.x,y:targetObjPoint.y,type:'top'}))
                edge.triangle = this.drowSanjiao({x:targetObjPoint.x,y:targetObjPoint.y,type:'top'})
            } else if (locationRelation.targetObj == 'bottom') {
                targetObjPoint.x = edge.targetObj.x;
                targetObjPoint.y = edge.targetObj.y + this.nodeShape[edge.targetObj.shape].height/2 + portDis;
                reData.push(["L",targetObjPoint.x,targetObjPoint.y + portOffset].join(' '))
                reData.push(["L",targetObjPoint.x,targetObjPoint.y].join(' '))
                // this.$set(edge,"triangle",this.drowSanjiao({x:targetObjPoint.x,y:targetObjPoint.y,type:'bottom'}))
                edge.triangle = this.drowSanjiao({x:targetObjPoint.x,y:targetObjPoint.y,type:'bottom'})
            } else if (locationRelation.targetObj == 'left') {
                targetObjPoint.x = edge.targetObj.x - this.nodeShape[edge.targetObj.shape].width/2 - portDis;
                targetObjPoint.y = edge.targetObj.y;
                reData.push(["L",targetObjPoint.x - portOffset,targetObjPoint.y].join(' '))
                reData.push(["L",targetObjPoint.x,targetObjPoint.y].join(' '))
                // this.$set(edge,"triangle",this.drowSanjiao({x:targetObjPoint.x,y:targetObjPoint.y,type:'left'}))
                edge.triangle = this.drowSanjiao({x:targetObjPoint.x,y:targetObjPoint.y,type:'left'})
            } else if (locationRelation.targetObj == 'right') {
                targetObjPoint.x = edge.targetObj.x + this.nodeShape[edge.targetObj.shape].width/2 + portDis;
                targetObjPoint.y = edge.targetObj.y;
                reData.push(["L",targetObjPoint.x + portOffset,targetObjPoint.y].join(' '))
                reData.push(["L",targetObjPoint.x,targetObjPoint.y].join(' '))
                // this.$set(edge,"triangle",this.drowSanjiao({x:targetObjPoint.x,y:targetObjPoint.y,type:'right'}))
                edge.triangle = this.drowSanjiao({x:targetObjPoint.x,y:targetObjPoint.y,type:'right'})
            }
            // let reData = [
            //     [sourceObjPoint.x,sourceObjPoint.y].join(" "),
            //     [targetObjPoint.x,targetObjPoint.y].join(" "),
            // ]
            // console.log("看看返回值",edge)
            // reData.unshift(reData[0])
            return reData.join(' ')
            return `${sourceObjPoint.x} ${sourceObjPoint.y},${targetObjPoint.x} ${targetObjPoint.y}`
            return `${edge.sourceObj.x} ${edge.sourceObj.y},${edge.targetObj.x} ${edge.targetObj.y}`
        },
        // 获取边链接的两个节点的位置关系
        getlocationRelation(edge) {
            let locationRelation = {
                sourceObj: "",
                targetObj: "",
            };
            // 获取图形夹角
            // let angle = this.getAngle({x: x1 - x3,y: y1 - y3,}, {x: x2 - x3,y: y2 - y3,});
            let angle = this.getAngle(edge.sourceObj.x,edge.sourceObj.y,edge.targetObj.x, edge.targetObj.y);
            // console.log("夹角是多少",angle,(0 <= angle && angle <= 45) || (135 <= angle && angle <= 225) ||  (315 <= angle && angle <= 360))
            if ( (0 <= angle && angle <= 45) || (135 <= angle && angle <= 225) || (315 <= angle && angle <= 360)) {//左右关系
                if (edge.sourceObj.x <= edge.targetObj.x) {//起始节点 在 终结节点 左边
                    // edge.sourceObj.edge
                    locationRelation.sourceObj = "right";
                    locationRelation.targetObj = "left";
                } else {
                    locationRelation.sourceObj = "left";
                    locationRelation.targetObj = "right";
                }
            } else if ( (45 < angle && angle < 135) ||  (225 < angle && angle < 315)) {//上下关系
                if (edge.sourceObj.y <= edge.targetObj.y) {//起始节点 在 终结节点 上边
                    // edge.sourceObj.edge
                    locationRelation.sourceObj = "bottom";
                    locationRelation.targetObj = "top";
                } else {
                    locationRelation.sourceObj = "top";
                    locationRelation.targetObj = "bottom";
                }

            }
            // console.log("看看处理完的关系",locationRelation)
            return locationRelation
        },
        // 计算两条直线的夹角
        getAngle(x1, y1, x2, y2) {
            /**
             * 计算从x1y1到x2y2的直线，与水平线形成的夹角
             * 计算规则为顺时针从左侧0°到与该直线形成的夹角
             * @param {Object} x1
             * @param {Object} y1
             * @param {Object} x2
             * @param {Object} y2
             */
            let x = x1 - x2,
                y = y1 - y2;
            if (!x && !y) {
                return 0;
            }
            let angle = (180 + Math.atan2(-y, -x) * 180 / Math.PI + 360) % 360;
            return 360 - angle;
        },
        // 生成三角形
        drowSanjiao(point) {
            // console.log("生成三角形",point)
            let triangleNodeArr = [];
            triangleNodeArr.push(["M",point.x,point.y].join(" "))
            
                // <path name="三角形" fill="red" stroke="blue" d="M150 50 L130 130 L170 130  Z"/>
            if (point.type == 'top') {
                // triangleNode
                triangleNodeArr.push(["L",point.x + 4,point.y - 7].join(" "))
                triangleNodeArr.push(["L",point.x - 4,point.y - 7].join(" "))
            } else if (point.type == 'bottom') {
                triangleNodeArr.push(["L",point.x + 4,point.y + 7].join(" "))
                triangleNodeArr.push(["L",point.x - 4,point.y + 7].join(" "))
            } else if (point.type == 'left') {
                triangleNodeArr.push(["L",point.x - 7,point.y + 4].join(" "))
                triangleNodeArr.push(["L",point.x - 7,point.y - 4].join(" "))
            } else if (point.type == 'right') {
                triangleNodeArr.push(["L",point.x + 7,point.y + 4].join(" "))
                triangleNodeArr.push(["L",point.x + 7,point.y - 4].join(" "))
            }
            triangleNodeArr.push(["Z"].join(" "))
            return {
                x: point.x,
                y: point.y,
                d: triangleNodeArr.join(" "),
                type: point.type
            }
            return triangleNodeArr.join(" ")
        },
        //node鼠标按下 
        nodemousedown(event,node) {
            // console.log("鼠标按下")
            let thisIn = this;
            // console.log("nodeMouseDown",event,node)

            let currentNode = event.target;//获取目标元素
            //算出鼠标相对元素的位置
            let disX = event.clientX - node.x;
            let disY = event.clientY - node.y;
            // console.log("112233",currentNode,disX,disY)
            // return
            document.onmousemove = (e)=>{       //鼠标按下并移动的事件
            // console.log("鼠标按下后边移动")
                //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                let left = e.clientX - disX;    
                let top = e.clientY - disY;
                // console.log("移动相对位置",left,top)
                // return
                //绑定元素位置到positionX和positionY上面
                // this.positionX = top;
                // this.positionY = left;
                
                //移动当前元素
                if (left > thisIn.$refs.svgGraph.clientWidth - currentNode.getBoundingClientRect().width) {//右侧边界
                    left = thisIn.$refs.svgGraph.clientWidth - currentNode.getBoundingClientRect().width;
                } else if (left < 0) {//左侧边界
                    left = 0;
                } else {
                    left = left;
                }
                if (top > thisIn.$refs.svgGraph.clientHeight - currentNode.getBoundingClientRect().height) {//底部边界
                    top = thisIn.$refs.svgGraph.clientHeight - currentNode.getBoundingClientRect().height;
                } else if (top < 0) {//上边边界
                    top = 0;
                } else {
                    top = top;
                }
                // currentNode.style.left = left + 'px';
                // currentNode.style.top = top + 'px';
                node.x = left;
                node.y = top;
                // console.log("kakankankanak位置",left,top)
                // console.log("9988",node,left,top)
                // 生成新节点后-提交修改状态-节点拖动
                thisIn.$emit('isEditChange',{hand:"nodeDrag"})
            };
            document.onmouseup = (e) => {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        },
        // node鼠标右键
        nodecontextmenu(e,node,type) {
            let that =this;
            // console.log("鼠标右键",this.rightClickMenu,node)
            // return
            // ***************************************菜单start
            // 设置右键菜单位置
            let graphObj = that.$refs.svgGraph.getBoundingClientRect();
            this.rightClickMenu.$el.style.top = e.clientY - graphObj.top - this.getScrollLoc().scrollY + 'px';
            this.rightClickMenu.$el.style.left = e.clientX - graphObj.left - this.getScrollLoc().scrollX+  'px';
            // 设置操作类型-过滤菜单选项
            let sendMenuData = {
                handType: "",
                node: node,
                // cell: cell
            }
            if (type == 'node') {
                sendMenuData.handType = "node:contextmenu";
            } else if (type == 'edge') {
                sendMenuData.handType = "edge:contextmenu";
            }
            this.rightClickMenu.setMenuList(sendMenuData)
            // 显示菜单
            this.rightClickMenu.myrightClickMenuData.isShow = true;
            // 禁止滚动功能(出现菜单禁用)
            // this.NB_graph.lockScroller()
            this.myCanvasEditor_graph.style.overflow = 'hidden'
            // ***************************************菜单end
            return
        },
        // node鼠标双击左键-展开配置
        nodedblclick(e,node,type) {

            let that =this;
            let reData = {
                handType: "node:contextmenu",
                node: node,
                menuInfo: {
                    key: "configData",
                    label: "配置信息",
                    icon: "GZL-配置信息.svg",
                    power: ["node:click","cell:contextmenu","node:contextmenu"],
                    nodePower: ["nodeNormal","nodeRouter","nodeLogicJudge","nodeMerge","nodeSubFlow","nodeBegin","nodeEnd"]
                }
            }
            this.$emit("menuChange",reData)
        },
        // 删除节点
        removeNode(node) {
            let that = this;
            console.log("dddddddddddddd",this.nodes,node)
            if (node.shape == 'edge') {//删除边
                let removeEdgeIndex = -1;
                this.edges.forEach(function(obj,index){
                    if (node.id == obj.id) {
                        removeEdgeIndex = index
                    }
                })
                that.edges.splice(removeEdgeIndex,1)
                // 生成新节点后-提交修改状态-删除边
                that.$emit('isEditChange',{hand:"edgeDel"})
            } else {//删除节点
                console.log("删除节点")
                // 删除节点
                let removeNodeIndex = -1;
                this.nodes.forEach(function(obj,index){
                    if (node.id == obj.id) {
                        removeNodeIndex = index
                    }
                })
                that.nodes.splice(removeNodeIndex,1)
                // 删除该节点上的边
                let removeEdgeIndexArr = [];
                this.edges.forEach(function(obj,index){
                    if ( node.id == obj.source.cell || node.id == obj.target.cell) {
                        removeEdgeIndexArr.push(index)
                    }
                })
                let newArr = this.edges.filter((item,index) => {
                    if (removeEdgeIndexArr.indexOf(index) == -1) {
                        return item
                    }
                })
                this.edges = newArr
                // 生成新节点后-提交修改状态-删除节点
                this.$emit('isEditChange',{hand:"nodeDel"})
            }
        },
        // edge箭头三角形拖拽
        edgeTrianglemousedown(event,edge) {
            
            console.log("edge箭头三角形拖拽",event,edge)
            return
            let thisIn = this;
            // console.log("edgeMouseDown",event,edge)

            let currentedge = event.target;//获取目标元素
            //算出鼠标相对元素的位置
            let disX = event.clientX - edge.triangle.x;
            let disY = event.clientY - edge.triangle.y;
            // console.log("112233",currentedge,disX,disY)
            // return
            document.onmousemove = (e)=>{       //鼠标按下并移动的事件
            // console.log("鼠标按下后边移动")
                //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                let left = e.clientX - disX;    
                let top = e.clientY - disY;
                // console.log("移动相对位置",left,top)
                // return
                //绑定元素位置到positionX和positionY上面
                // this.positionX = top;
                // this.positionY = left;
                
                //移动当前元素
                if (left > thisIn.$refs.svgGraph.clientWidth - currentedge.getBoundingClientRect().width) {//右侧边界
                    left = thisIn.$refs.svgGraph.clientWidth - currentedge.getBoundingClientRect().width;
                } else if (left < 0) {//左侧边界
                    left = 0;
                } else {
                    left = left;
                }
                if (top > thisIn.$refs.svgGraph.clientHeight - currentedge.getBoundingClientRect().height) {//底部边界
                    top = thisIn.$refs.svgGraph.clientHeight - currentedge.getBoundingClientRect().height;
                } else if (top < 0) {//上边边界
                    top = 0;
                } else {
                    top = top;
                }
                // currentedge.style.left = left + 'px';
                // currentedge.style.top = top + 'px';
                // edge.triangle.x = left;
                // edge.triangle.y = top;
                // edge.targetObj.x = left;
                // edge.targetObj.y = top;
                edge.triangle = thisIn.drowSanjiao({
                    x: left,
                    y: top,
                    type: edge.triangle.type
                })
                // thisIn.$forceUpdate()
            // thisIn.$set(edge,"triangle",thisIn.drowSanjiao({
            //         x: left,
            //         y: top,
            //         type: edge.triangle.type
            //     }))
            // edge.triangle.x = left;
            // edge.triangle.y = top;
            // thisIn.$set(edge.triangle,"x",left)
            // thisIn.$set(edge.triangle,"y",top)
            // edge.targetObj.x = left;
            // edge.targetObj.y = top;
            console.log("看看返回值111",edge.triangle)
                // thisIn.setEdgePointsFn(edge)
                // console.log("9988",edge,left,top)
            };
            document.onmouseup = (e) => {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        },
        // 生成画布
        initGraph(configData) {
            console.log('生成画布配置',configData)
            // console.log('initGraph',obj)
            this.configData = {...configData};//获取配置信息
            // this.container = this.configData.container;//获取控制元素
            // 生成canvas节点并放入节点
            // this.myCanvasObj = document.createElement('canvas');
            // this.container.appendChild(this.myCanvasObj);
            // this.graphConfig.width = this.container.offsetWidth; // 设置宽高
            // this.graphConfig.height = this.container.offsetHeight; // 设置宽高
            this.graphConfig.width = '2000px'; // 设置宽高
            this.graphConfig.height = '2000px'; // 设置宽高
            // 设置画布样式
            this.initBackground();
            // 设置画布网格
            // this.initGrid();
            // 设置画布事件
            // this.initEvent();
            // this.data.myCanvasObj.height = 500;
            // return this
        },
        // 设置画布网格
        initGrid() {
            let grid = this.configData.grid ? this.configData.grid : {};
            grid.visible = grid.visible ? grid.visible : false;//是否启用网格-默认不启用
            grid.color = grid.color ? grid.color : "#e0e1e6";//网格颜色-默认黑色
            grid.size = grid.size ? grid.size : 10;//网格大小-默认10
            if (!grid.visible) { //是否开启网格
                return
            }
            // console.log("设置网格",this.myCanvasObj.getContext('2d'))
            // return
            // if (this.myCanvasObj.getContext) {
                // return
            // let ctx = this.myCanvasObj.getContext('2d');//获取画布绘制环境
            // ctx.clearRect(0, 0, this.myCanvasObj.width, this.myCanvasObj.height);//清空画布内像素
            // 判断x/y方向需要绘制多少个点
            let xPoitNum = this.$refs.svgGraph.getBoundingClientRect().width/grid.size;
            let yPoitNum = this.$refs.svgGraph.getBoundingClientRect().height/grid.size;
            console.log("y方向需要绘制多少个点",this.$refs.svgGraph.getBoundingClientRect(),xPoitNum,yPoitNum)
            this.backgroundCirArr = [];
            for(let xx = 0; xx <= xPoitNum; xx++) {
                for(let yy = 0; yy <= yPoitNum; yy++) {
                    // console.log("看看效率")
                    this.backgroundCirArr.push({
                        x: xx*grid.size,
                        y: yy*grid.size,
                        r: 1,
                        fillColor: grid.color

                    })
                }
            }
            console.log("看看北背景渲染结果",this.backgroundCirArr)

            // }
        },
        // 设置画布样式
        initBackground() {
            let graphSty = this.configData.background ? this.configData.background : {};
            //设置颜色or默认画布颜色
            graphSty.color = graphSty.color ? graphSty.color : '#F8FAFF';
            this.$refs.svgGraph.style.background = graphSty.color;
        },
        // 获取UUID
        getUUID() {
            let len = 16;
            let radix = 16;
            var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
            var uuid = [],
                i;
            radix = radix || chars.length;

            if (len) {
                // Compact form
                for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
            } else {
                // rfc4122, version 4 form
                var r;

                // rfc4122 requires these characters
                uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
                uuid[14] = '4';

                // Fill in random data.  At i==19 set the high bits of clock sequence as
                // per rfc4122, sec. 4.1.5
                for (i = 0; i < 36; i++) {
                    if (!uuid[i]) {
                        r = 0 | Math.random() * 16;
                        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                    }
                }
            }

            return uuid.join('');
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },
        // 获取滚动条位置
        getScrollLoc() {
            // console.log("获取滚动条位置",this.myCanvasEditor_graph,this.myCanvasEditor_graph.scrollTop)
            return {scrollX:this.myCanvasEditor_graph.scrollLeft,scrollY:this.myCanvasEditor_graph.scrollTop}
            //  this.myCanvasEditor_graph.style.overflow = 'hidden'
        },
        // 获取json数据
        toJSON() {
            let reData = {
                cells: this.cell,
                nodes: this.nodes,
                edges: this.edges,
            };
            return reData
        },
        // 清空画布
        emptyGraph() {
            // console.log("清空画布")
            this.nodes = [];
            this.edges = [];
        }
    }
}
</script>

<style lang="scss">

.svgGraphBox {
    // width: 2000px;
    // height: 2000px;
    .svgGraph {
        // width: 2000px;
        // height: 2000px;
        position: relative;
        // 人工流程样式
        .nodeBox {
            cursor: move;
            &:hover {
                .pointCircleBox {
                    display: block;
                }
            }
            .pointCircleBox {
                cursor: pointer;
                display: none;
            }
        }
        .edgeBox {
            cursor: pointer;
        }
        // 字体
        .nodeText {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
        }
    }
}

</style>