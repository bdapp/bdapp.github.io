
//验证银行卡的真实性
function verify(bankCard){
          var result=null;
            $.ajax({
                url:'https://ccdcapi.alipay.com/validateAndCacheCardInfo.json?cardNo='+bankCard+'&cardBinCheck=true',
                type:'GET', //GET
                async:false,    //或false,是否异步
                timeout:5000,    //超时时间
                dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
                beforeSend:function(xhr){
                    // console.log(xhr)
                    // console.log('发送前')
                },
                success:function(data,textStatus,jqXHR){
                    // console.log(data.stat)
                    result = data.validated;
                    // console.log(textStatus)
                    // console.log(jqXHR)
                },
                error:function(xhr,textStatus){
                    // console.log('错误')
                    // console.log(xhr)
                    // console.log(textStatus)
                },
                complete:function(){
                    // console.log('结束')
                }
            })

        console.log(result);
        return result;
        
}