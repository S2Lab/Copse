"use strict";
var Copse={};
(function () {
    Copse.vars={}; // 储存变量
    Copse.vars.attrs=[]; // 当前的所有属性
    Copse.vars.buffs=[]; // 当前的所有状态
    Copse.vars.length=0; // 已经完全走过的距离 重生的时候会重生到这里
    Copse.vars.length_temp=0; // 当前的行进距离
    Copse.vars.keys={}; // 关键事件变量

    Copse.guis={}; // gui相关的东西

    Copse.funs={}; // 功能
    Copse.funs.addAttr=function(attrIn,valueIn) // 增加某一项属性
    {
        ;
    }
    Copse.funs.reduceAttr=function(attrIn,valueIn) // 减少某一项属性
    {
        ;
    }
    Copse.funs.addBuff=function(buffIn) // buff 相关操作
    {
        ;
    }
    Copse.funs.removeBuff=function(buffIn)
    {
        ;
    }
    Copse.funs.setLength=function(lIn) // 永久距离
    {
        Copse.vars.length=lIn;
    }
    Copse.funs.getLength=function() 
    {
        return Copse.vars.length;
    }
    Copse.funs.setTempLength=function(lIn)
    {
        Copse.vars.length_temp=lIn;
    }
    Copse.funs.getTempLength=function()
    {
        return Copse.vars.length_temp;
    }

    Copse.funs.__attr_setAttributes=function(attrNodeIn,idIn,posIn)
    {
        attrNodeIn.setAttribute("style","margin:12px;display:inline;"+
            "width:64px;max-width:64px;height:64px;max-height:64px;border:1px solid black;background-color:blue;");
        attrNodeIn.setAttribute("class","gui_attr_node");
        attrNodeIn.setAttribute("id",idIn);
        attrNodeIn.innerText="attr node "+idIn;
    }
    Copse.funs.__infobox_moveup=function()
    {
        document.getElementById("gui_info_box").style["bottom"]="0px";
    }
    Copse.funs.__infobox_movedown=function()
    {
        document.getElementById("gui_info_box").style["bottom"]="-50px";
    }
    Copse.funs.__infobox_clicked=function()
    {
        document.getElementById("gui_info_box").style["display"]="none";
    }
    Copse.funs._initGUI=function() // 初始化界面
    {
        let body=document.getElementsByTagName("body")[0];

        // 基础背景
        let base=document.createElement("div");
        base.setAttribute("style","position:fixed;top:0px;left:0px;"+
            "width:100%;height:100%;background-color:yellow;"+
            "font-family:楷体;font-size:32px;text-align:center;"+
            "min-width:720px;min-height:600px;");
        base.setAttribute("id","gui_base");
        base.innerText="COPSE_GUI_BASE";
        body.appendChild(base);


        // 属性条目
        let attr_money=document.createElement("div");
        Copse.funs.__attr_setAttributes(attr_money,"gui_attr_node_money",0);
        let attr_suply=document.createElement("div");
        Copse.funs.__attr_setAttributes(attr_suply,"gui_attr_node_suply",1);
        let attr_power=document.createElement("div");
        Copse.funs.__attr_setAttributes(attr_power,"gui_attr_node_power",2);

        // 属性栏
        let attrs=document.createElement("div");
        attrs.setAttribute("id","gui_buffs");
        attrs.setAttribute("style","position:fixed;top:5%;left:10%;width:80%;height:72px;"+
            "border:1px solid black;text-align:center;overflow:hidden");
        attrs.innerText="attrs box";
        attrs.appendChild(attr_money);
        attrs.appendChild(attr_suply);
        attrs.appendChild(attr_power);
        base.appendChild(attrs);


        // 状态栏
        let buffs=document.createElement("div");
        buffs.setAttribute("id","gui_buffs");
        buffs.setAttribute("style","position:fixed;top:20%;left:15%;width:70%;height:64px;"+
            "border:1px solid black;");
        base.appendChild(buffs);


        // 卡片
        let card_box=document.createElement("div");
        card_box.setAttribute("id","gui_card_box");
        card_box.setAttribute("style","position:fixed;top:40%;"+
            "width:100%;height:256px;border:1px solid black;"+
            "vertical-align:center;text-align:center;background-color:white;");
        base.appendChild(card_box);
        let card=document.createElement("div");
        card.setAttribute("id","gui_card");
        card.setAttribute("style","width:256px;height:256px;border:1px solid black;"+
            "background-color:green;margin:0 auto");
        card_box.appendChild(card);
        let card_caption=document.createElement("div");
        card_caption.setAttribute("id","gui_card_caption");
        card_caption.setAttribute("style","width:100%;height:64px;border:1px solid black");
        card_caption.innerText="card caption";
        card.appendChild(card_caption);

        let card_content=document.createElement("div");
        card_content.setAttribute("id","gui_card_content");
        card_content.setAttribute("style","width:100%;height:128px;");
        card_content.innerText="Card Content";
        card.appendChild(card_content);

        let card_ch1=document.createElement("div");
        let card_ch2=document.createElement("div");
        card_ch1.setAttribute("id","gui_card_ch1");
        card_ch2.setAttribute("id","gui_card_ch2");
        card_ch1.setAttribute("onclick","gui_ch1_clicked()");
        card_ch2.setAttribute("onclick","gui_ch2_clicked()");
        card_ch1.setAttribute("style","height:64px;width:100px;border:1px solid black;float:left;");
        card_ch2.setAttribute("style","height:64px;width:100px;border:1px solid black;float:right;");
        card_ch1.innerText="ch1";
        card_ch2.innerText="ch2";
        card.appendChild(card_ch1);
        card.appendChild(card_ch2);

        let info_box=document.createElement("div");
        info_box.setAttribute("id","gui_info_box");
        info_box.setAttribute("style","position:fixed;bottom:-50px;left:0px;height:100px;width:100%;background-color:green;");
        info_box.setAttribute("onmouseover","Copse.funs.__infobox_moveup()");
        info_box.setAttribute("onmouseout","Copse.funs.__infobox_movedown()");
        info_box.setAttribute("onclick","Copse.funs.__infobox_clicked()");
        info_box.innerText="INFO BOX";
        base.appendChild(info_box);



        // 注册组件
        Copse.guis.base=base;
        Copse.guis.attrs=attrs;
        Copse.guis.attr_money=attr_money;
        Copse.guis.attr_suply=attr_suply;
        Copse.guis.attr_power=attr_power;
        Copse.guis.buffs=buffs;

        Copse.guis.card_caption=card_caption;
        Copse.guis.card_content=card_content;
        Copse.guis.card_ch1=card_ch1;
        Copse.guis.card_ch2=card_ch2;

        Copse.guis.info_box=info_box;
    }
    Copse.funs._initGame=function() // 初始化游戏
    {
        console.log("游戏初始化...\n"+Copse.infos.name+" "+Copse.infos.version);
        // 加载所有基础信息
        Copse.funs._initCards();console.log("卡片数据加载完成");
        // 读取存档
        Copse.funs._readSave();
        console.log("存档加载完成");
        // 加载GUI
        Copse.funs._initGUI();
        console.log("界面加载完成");
    }
    Copse.funs._writeSave=function() // 保存存档
    {
        localStorage.setItem("save",JSON.stringify(Copse.vars));
    }
    Copse.funs._readSave=function() // 从存档初始化
    {
        let save_get=localStorage.getItem("save");
        if(save_get!=null) // 读取到存档了
        {
            Copse.vars=JSON.parse(save_get);
        }
    }
    Copse.funs._clearSave=function() // 清空存档
    {
        localStorage.clear();
    }

    Copse.funs.registerCard=function(nameIn,cardIn)
    {
        Copse.consts.cards["C_"+nameIn]=cardIn;
    }
    Copse.funs.getCard=function(nameIn)
    {
        let ret=Copse.consts.cards["C_"+nameIn];
        if(ret===undefined)
            return Copse.funs.getCard("ERROR");
        else
            return ret;
    }
    Copse.funs._initCards=function() // 所有的卡片数据在这里
    {
        let ERROR=new Copse.classes.classCard();
        ERROR.setCaption("错误卡片").setBGC("#300000")
        .setContent("错误的卡片!");

        let NULL=new Copse.classes.classCard();
        NULL.setCaption("空卡").setBGC("gray")
        .setContent("空卡片 没有任何作用");

        let WIN=new Copse.classes.classCard();
        WIN.setCaption("胜利").setBGC("green")
        .setContent("你获胜了");

        Copse.funs.registerCard("ERROR",ERROR);
        Copse.funs.registerCard("NULL",NULL);
        Copse.funs.registerCard("WIN",WIN);
    }
    Copse.funs.gui_showCard=function(cardIn,ifEvtIn)
    {
        Copse.guis.card_caption.innerText=cardIn.getCaption();
        Copse.guis.card_content.innerText=cardIn.getContent();
        Copse.guis.card_ch1.innerText=cardIn.getCh1();
        Copse.guis.card_ch2.innerText=cardIn.getCh2();

        if(ifEvtIn)
            cardIn.getEvt() ();
    }



    Copse.consts={};
    Copse.consts.max_length=0; // 最大距离
    Copse.consts.places={};
    Copse.consts.cards={};

    Copse.classes={};
    Copse.classes.classCard=function()
    {
        let card=this;
        let caption="Card Caption";
        let content="Card Content";
        let bgc="white";
        let c="black";
        this.setCaption=function(captionIn)
        {
            caption=captionIn;
            return card;
        }
        this.getCaption=function()
        {
            return caption;
        }
        this.setContent=function(contentIn)
        {
            content=contentIn;
            return card;
        }
        this.getContent=function()
        {
            return content;
        }
        this.setBGC=function(cIn)
        {
            bgc=cIn;
            return card;
        }
        this.getBGC=function(cIn)
        {
            return bgc;
        }
        this.setC=function(cIn)
        {
            this.c=cIn;
            return card;
        }
        this.getC=function()
        {
            return c;
        }

        let evt=function(){}; // 当出现这张卡时一定会执行的东西
        this.setEvt=function(evtIn)
        {
            evt=evtIn;
            return card;
        }
        this.getEvt=function()
        {
            return evt;
        }

        
        let ch1="choice 1";
        let ch2="choice 2";
        let ch1_next="NULL";
        let ch2_next="NULL";
        this.setCh1=function(chIn)
        {
            ch1=chIn;
            return card;
        }
        this.getCh1=function()
        {
            return ch1;
        }
        this.setCh2=function(chIn)
        {
            ch2=chIn;
            return card;
        }
        this.getCh2=function()
        {
            return ch2;
        }
    }
    Copse.classes.classEvt=function()
    {
        let name="Event";
        let cards=[]; // 事件包含的卡片s
    }
    Copse.classes.classPlace=function()
    {
        let name="Place";
        let locMax=100;
        let locMin=0;
        this.setName=function(nameIn)
        {
            name=nameIn;
        }
        this.getName=function()
        {
            return name;
        }
        this.setLocMax=function(locIn)
        {
            locMax=locIn;
        }
        this.getLocMax=function()
        {
            return locMax;
        }
        this.setLocMin=function(locIn)
        {
            locMin=locIn;
        }
        this.getLocMin=function()
        {
            return locMin;
        }

        let evtsOnEnter=[]; // 进入场景
        let evtsOnLeave=[]; // 离开场景
        let evtsOnDay=[]; // 白天
        let evtsOnNight=[]; // 夜间
        let evtsOnTime=[]; // 时间流逝
        this.registerEvt=function(tagIn,evtIn)
        {
            return;
        }
        this.getEvts=function(tagIn)
        {
            return null;
        }

    }

    

    Copse.infos={}; // 储存信息
    Copse.infos.name="Copse";
    Copse.infos.author="Firok";
    Copse.infos.version="0.5.0";
    Copse.infos.link="github.com/S2Lab/Copse";




    Copse.funs._initGame(); // 初始化游戏
})();
