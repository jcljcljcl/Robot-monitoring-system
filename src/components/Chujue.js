import React from 'react'
import { RedditOutlined } from '@ant-design/icons';
import { Select } from 'antd';
//和redux连接
import {connect} from 'react-redux'
//获取更多数据
import {loadChujueAction}  from '../store/actions/loadChujue'
//导入echarts
import echarts from 'echarts'

const { Option } = Select;

class Chujue extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
          tongdao:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
          //单通道内容
          option_dan:{
            xAxis: {
                type: 'category',
                data: []
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [],
                type: 'line',
                smooth: true
            }]
        },

        //24通道内容
        option_24:{
          xAxis: {
              type: 'category',
              data: ['1', '2', '3', '4', '5', '6', '7','8', '9', '10', '11', '12', '13', '14','15', '16', '17', '18', '19', '20', '21','22', '23', '24']
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              data: [],
              type: 'line',
              smooth: true
          }]
      }
         };

    }

    componentDidMount(){
      //获取触觉数据

      this.props.dispatch(loadChujueAction);
      let chujueList = this.props.chujueReducer.chujueData;
      //加载折线图
      var myChart = echarts.init(document.getElementById('chujue-dan-context'));
      for(let i in chujueList){
        if(chujueList[i].flag == 1){
          this.state.option_dan.series[0].data.push(chujueList[i].pow)
          var time = chujueList[1].time
          //将字符串按照空格分割
          var arr = time.split(" ");//以空格分开
          this.state.option_dan.xAxis.data.push(arr[i])
        }
      }
      myChart.setOption(this.state.option_dan)

      var myChart1 = echarts.init(document.getElementById('chujue-24-context'));
      //改变数据
      for(let i in chujueList){
        this.state.option_24.series[0].data.push(chujueList[i].pow)
      }
      myChart1.setOption(this.state.option_24)
    }
    

    handleChange=(value)=>{
      let chujueList = this.props.chujueReducer.chujueData;
        var num =Number(`${value}`)
        this.state.option_dan.series[0].data=[]
        this.state.option_dan.xAxis.data=[]
        for(let i in chujueList){
          if(chujueList[i].flag == num){
            this.state.option_dan.series[0].data.push(chujueList[i].pow)
            var time = chujueList[i].time
            //将字符串按照空格分割
            var arr = time.split(" ");//以空格分开
            this.state.option_dan.xAxis.data.push(arr[1])
          }
        }
        console.log( this.state.option_dan.series[0].data)
        var myChart = echarts.init(document.getElementById('chujue-dan-context'));
        myChart.setOption(this.state.option_dan)
      }
    

    render() {
    
        return (
            <div>

                <div className="IP">
                  <div className="chujue-icon"> 
                    <RedditOutlined />&nbsp;触觉信息显示
                  </div>
                    <div className="chujue-ip"> 
                      触觉IP地址：<input type='text'/>端口号：<input type='text'/><button>连接</button>
                    </div>
                </div>

                <div className="chujue-context">
                  <div className="chujue-dan">
                      <span className="chujue-dan-title">单通道受力曲线</span>&nbsp;&nbsp;&nbsp;
                      <span>
                         <Select defaultValue="1" style={{ width: 80}} onChange={this.handleChange}>
                        {
                          this.state.tongdao.map((value,key)=>{
                            return <Option key={key} value={value}>{value}</Option>
                          })
                        }
                      </Select>
                      </span>
                      <div className="chujue-dan-context" id="chujue-dan-context">
                        我是内容
                      </div>
                  </div>
                  <div className="chujue-24">
                      <span className="chujue-24-title">24路受力曲线</span>
                      <div className="chujue-24-context" id="chujue-24-context">
                        我是内容
                      </div>
                  </div>
                </div>
            </div>
        );
    }
}


//返回redux的触觉数据状态
const mapStateToProps = (state /*, ownProps*/) => {
  return {
      //注意：这里面的属性名要和reducers下Index的属性名一致
      chujueReducer: state.chujueReducer,
  }
}

export default connect(mapStateToProps)(Chujue);