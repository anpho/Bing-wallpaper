var i18n={regx:/`([\w\d\s.-]*?)`/ig,process:function(a,b){var c=a.querySelectorAll('[i18n=true]');for(var i=0;i<c.length;i++){var d=c[i];var e=i18n.getAllPropsOf(d);var f=e[0];for(var j=0;j<f.length;j++){var g=f[j];var h=g.v;var t=i18n.regx.exec(h);while(t){h=i18n.replace(h,t[1],b);console.log('[i18n]>>'+JSON.stringify(g)+">>"+h);t=i18n.regx.exec(h)}d[g.p]=h}var k=e[1];for(var j=0;j<k.length;j++){var g=k[j];var h=g.v;var t=i18n.regx.exec(h);while(t){h=i18n.replace(h,t[1],b);console.log('[i18n]>>'+JSON.stringify(g)+">>"+h);t=i18n.regx.exec(h)}d.setAttribute([g.a],h)}}},replace:function(a,b,c){var d=i18n.get(b,c);var e=new RegExp('`'+b+'`',"ig");return a.replace(e,d)},get:function(a,b){try{var c=qstr[b][a];if(c){return c}else{return"["+a+"]"}}catch(ex){c=qstr[qstr.default][a];if(c){return c}else{return"["+a+"]"}}},getAllPropsOf:function(a){var b=[];if(a.innerHTML&&a.innerHTML.length>2)b.push({p:'innerHTML',v:a.innerHTML});var c=[];if(a.attributes){for(var i=0;i<a.attributes.length;i++){var d=a.attributes[i];if(d.value.length>3){c.push({a:d.name,v:d.value})}}}return[b,c]}};
var qstr = {
    default: "zh-CN",
    "zh-CN": {
        'Previous':'上一个',
        'Next':'下一个',
        'CopyImageURL':'复制图片链接',
        'OpenFullSizeImage':'打开全尺寸图片',
        'Share':'共享',
        'Wallpaper':'设置为壁纸',
        'Refresh':'重新载入',
        'about':'关于',
        'settings':'设置',
        'dev':'Merrick Zhang (anphorea@gmail.com),微博 @anphox',
        'Developer':'开发人员',
        'about1':'这个app可以让你下载每日必应美图，并将其设置为壁纸。',
        'about2':'自动适配BlackBerry Z10/Z30。如果你使用的是BlackBerry Q10/Q5，你需要手动进行裁剪以获得最佳视角。',
        'Test':'测试小组',
        'nomore':"没有此前的数据",
        'nomore2':'没有此后的数据',
        'copied':'链接已复制到剪贴板'
    },
    'en-US':{
        'Previous':'Previous',
        'Next':'Next',
        'CopyImageURL':'Copy Image URL',
        'OpenFullSizeImage':'Open Full Size Image',
        'Share':'Share Image',
        'Wallpaper':'Set As Wallpaper',
        'Refresh':'Reload',
        'about':'About',
        'settings':'Settings',
        'dev':'Port Programmer / UI: Merrick Zhang (anphorea@gmail.com), as anpho',
        'Developer':'Developer',
        'about1':'This app will help you download daily updated Bing wallpapers and set them as wallpaper.',
        'about2':'Adapted for BlackBerry Z10/Z30. You need to crop the images by yourself if you\'re useing BlackBerry Q10/Q5' ,
        'Test':'Test Team',
        'nomore':"No data before this day",
        'nomore2':'No data after this day',
        'copied':'Link copied to clipboard.'
    }
};
