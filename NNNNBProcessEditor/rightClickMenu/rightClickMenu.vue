<template>
  <div class="rightClickMenuBox">
      <div class="menuItem" v-for="(item,index) in menuList" :key="index" @click="menuItemFn(item)">
        <img :src="require('../../svg/' + item.icon)" >
        <!-- <img src="../svg/GZL-帮助.svg" alt=""> -->
        <span>{{item.label}}</span>
      </div>
  </div>
</template>

<script>
export default {
    props: ['rightClickMenuData'],
    data() {
        return {
            myrightClickMenuData: {},
            eventType: {
                "cell:click": "单击节点/边",
                "node:click": "单击节点",
                "edge:click": "单击边",
                "blank:click": "单击节画布",
                "cell:contextmenu": "右键节点/边",
                "node:contextmenu": "右键节点",
                "edge:contextmenu": "右键边",
                "blank:contextmenu": "右键节画布",
            },
            menuList: [],
            handObj: {},
            handCell: {},
            menuType: [
                {
                    key: "del",
                    label: "删除",
                    icon: "GZL-删除.svg",
                    power: ["node:click","edge:click","node:contextmenu"],
                    nodePower: ["nodeNormal","nodeRouter","nodeLogicJudge","nodeMerge","nodeSubFlow"]
                },{
                    key: "nodeData",
                    label: "节点信息",
                    icon: "GZL-节点信息.svg",
                    power: ["node:click","cell:contextmenu","node:contextmenu"],
                    nodePower: ["nodeNormal","nodeRouter","nodeLogicJudge","nodeMerge","nodeSubFlow","nodeBegin","nodeEnd"]
                },{
                    key: "configData",
                    label: "配置信息",
                    icon: "GZL-配置信息.svg",
                    power: ["node:click","cell:contextmenu","node:contextmenu"],
                    nodePower: ["nodeNormal","nodeRouter","nodeLogicJudge","nodeMerge","nodeSubFlow","nodeBegin","nodeEnd"]
                },{
                    key: "progressWalk",
                    label: "流程演示",
                    icon: "GZL-演示.svg",
                    power: ["node:click","cell:contextmenu","node:contextmenu"],
                    nodePower: ["nodeNormal","nodeRouter","nodeLogicJudge","nodeMerge","nodeSubFlow","nodeBegin","nodeEnd"]
                }
            ]
        }
    },
    created() {
        this.initData()
    },
    methods: {
        initData() {
            this.myrightClickMenuData = this.rightClickMenuData
            this.menuList = this.menuType.map(item => {
                return item
            })
        },
        // 菜单点击后执行
        menuItemFn(item) {
            // console.log("点击菜单选项后执行",item,this.handObj)
            let reData = {
                menuInfo: item,
            }
            for (let item in this.handObj) {
                reData[item] = this.handObj[item];
            }
            this.$emit("menuChange",reData)
        },
        // 设置菜单列表
        setMenuList(sendMenuData) {
            console.log("菜单列表获取参数",sendMenuData)
            let that = this;
            this.menuList = this.menuType.filter(item => {
                if (item.power.includes(sendMenuData.handType) && item.nodePower.includes(sendMenuData.node.shape)) {
                    return item
                }
            })
            this.handObj = sendMenuData;
            console.log("看看菜单列表",this.menuList)
        },
    }
}
</script>

<style lang="scss">

.rightClickMenuBox {
    position: absolute;
    // width: 108px;
    // height: 157px;
    background: #FFFFFF;
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.16);
    border-radius: 4px;
    .menuItem {
        padding: 10px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #303133;
        cursor: pointer;
        transition: all 0.2s ease-in;
        img {
            width: 12px;
            margin-right: 6px;
            // position: relative;
            //     left: -80px;
            //     filter: drop-shadow(red 80px 0);
        }
        &:hover {
            background: #F7F9FC;
        }
    }
}

</style>