
//生成随机银行卡号
function getBank_account(verifyBank) {
    while (true) {
        var bank_no = bank_no = Math.floor(Math.random() * 15);
        var prefix = "";
        var bankName = "";
        switch (bank_no) {
            case 0:    //工商银行-E时代卡
                prefix = "622202";
                bankName = "工商银行";
                break;
            case 1:    //农业银行-金穗通宝卡(银联卡)-借记卡
                prefix = "622848";
                bankName = "农业银行";
                break;
            case 2:    //建设银行-龙卡储蓄卡(银联卡)-借记卡
                prefix = "622700";
                bankName = "建设银行";
                break;
            case 3:    //交通银行-交银IC卡-借记卡
                prefix = "622262";
                bankName = "交通银行";
                break;
            case 4:     //中国银行-个人普卡-借记卡
                prefix = "621661";
                bankName = "中国银行";
                break;
            case 5:    //光大银行-阳光卡(银联卡)-借记卡
                prefix = "622666";
                bankName = "光大银行";
                break;
            case 6:     //民生银行-民生借记卡(银联卡)-借记卡
                prefix = "622622";
                bankName = "民生银行";
                break;
            case 7:    //广发银行股份有限公司-广发银联标准普卡-贷记卡
                prefix = "622556";
                bankName = "广发银行";
                break;
            case 8:    //招商银行
                prefix = "622588";
                bankName = "招商银行";
                break;
            case 9:    //平安银行股份有限公司-平安银行信用卡-贷记卡
                prefix = "622155";
                bankName = "平安银行";
                break;
            case 10:     //中信银行信用卡中心(63020000)-中信银联标准贷记卡-贷记卡
                prefix = "622689";
                bankName = "中信银行";
                break;
            case 11:     //华夏银行-华夏卡(银联卡)-借记卡
                prefix = "622630";
                bankName = "华夏银行";
                break;
            case 12:     //兴业银行-兴业自然人生理财卡-借记卡
                prefix = "622908";
                bankName = "兴业银行";
                break;

            default:
        }

        //随机生成16或19位长度的卡号
        var len = [10, 13];
        for (var j = 0; j < len[Math.ceil(Math.random() * 2)]; j++) {
            prefix = prefix + Math.floor(Math.random() * 10);
        }

        if (luhmCheck(prefix)) {
            //校验银行卡真实性
            if (verifyBank == 1) {
                if (verify(prefix))
                    return prefix + " (" + bankName + ")"
            } else {
                return prefix + " (" + bankName + ")"
            }
        }
    }
}


//Create Time:  07/28/2011
//Operator:     刘政伟
//Description:  银行卡号Luhm校验

//Luhm校验规则：16位银行卡号（19位通用）:

// 1.将未带校验位的 15（或18）位卡号从右依次编号 1 到 15（18），位于奇数位号上的数字乘以 2。
// 2.将奇位乘积的个十位全部相加，再加上所有偶数位上的数字。
// 3.将加法和加上校验位能被 10 整除。

//方法步骤很清晰，易理解，需要在页面引用Jquery.js    

//bankno为银行卡号 banknoInfo为显示提示信息的DIV或其他控件
function luhmCheck(bankno) {
    if (bankno.length != 16 && bankno.length != 19) {
        return false;
    }

    var lastNum = bankno.substr(bankno.length - 1, 1);//取出最后一位（与luhm进行比较）

    var first15Num = bankno.substr(0, bankno.length - 1);//前15或18位
    var newArr = new Array();
    for (var i = first15Num.length - 1; i > -1; i--) {    //前15或18位倒序存进数组
        newArr.push(first15Num.substr(i, 1));
    }
    var arrJiShu = new Array();  //奇数位*2的积 <9
    var arrJiShu2 = new Array(); //奇数位*2的积 >9

    var arrOuShu = new Array();  //偶数位数组
    for (var j = 0; j < newArr.length; j++) {
        if ((j + 1) % 2 == 1) {//奇数位
            if (parseInt(newArr[j]) * 2 < 9)
                arrJiShu.push(parseInt(newArr[j]) * 2);
            else
                arrJiShu2.push(parseInt(newArr[j]) * 2);
        }
        else //偶数位
            arrOuShu.push(newArr[j]);
    }

    var jishu_child1 = new Array();//奇数位*2 >9 的分割之后的数组个位数
    var jishu_child2 = new Array();//奇数位*2 >9 的分割之后的数组十位数
    for (var h = 0; h < arrJiShu2.length; h++) {
        jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
        jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
    }

    var sumJiShu = 0; //奇数位*2 < 9 的数组之和
    var sumOuShu = 0; //偶数位数组之和
    var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
    var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
    var sumTotal = 0;
    for (var m = 0; m < arrJiShu.length; m++) {
        sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
    }

    for (var n = 0; n < arrOuShu.length; n++) {
        sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
    }

    for (var p = 0; p < jishu_child1.length; p++) {
        sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
        sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
    }
    //计算总和
    sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

    //计算Luhm值
    var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
    var luhm = 10 - k;

    if (lastNum == luhm) {
        // $("#banknoInfo").html("Luhm验证通过");
        return true;
    }
    else {
        // $("#banknoInfo").html("银行卡号必须符合Luhm校验");
        return false;
    }
}


