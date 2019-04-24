import React, { Component } from 'react';
import "antd/dist/antd.css";
import { Layout, Slider, Input, InputNumber, Row, Col, PageHeader } from 'antd';
import axios from 'axios';
const { Content } = Layout;


class Calc extends Component {
  state = {
    Amount: 500,
    duration: 6,
    monthly: null,
    interest: null
  }
  apiCall = () => {
    axios.get('https://ftl-frontend-test.herokuapp.com/interest?amount=' + this.state.Amount + '&numMonths=' + this.state.duration)
      .then(res => {
        console.log(res);
        this.setState({ monthly: res.data.monthlyPayment.amount, interest: res.data.interestRate })
      })
      .catch(err => {
        console.log(err);
      })
  }
  onChangeAmount = e => {
    if (typeof e === "number" && e >= 500 && e <= 5000) {
      this.setState({ Amount: e });
      setTimeout(() => {
        this.apiCall();
      }, 500);
    }
  }
  onChangeDuration = e => {
    if (typeof e === "number" && e >= 6 && e <= 24) {
      this.setState({ duration: e });
      setTimeout(() => {
        this.apiCall();
      }, 500);
    }
  }
  render() {
    const { Amount, duration, monthly, interest } = this.state;
    return (
      <Layout>
        <PageHeader
          title="Full Throttle Labs"
          style={{
            background: '#A9A9A9'
          }}
        />
        <Content style={{
          background: '#fff', paddingTop: 50, margin: 0, minHeight: 280,
        }}
        >
          <Row>
            <Col xs={{ span: 22, offset: 2 }} lg={{ span: 22, offset: 2 }}>
              <Row>
                <Col span={12}>
                  <span style={{ float: 'left' }}>Loan Amount(in US$):</span>
                  <Slider
                    min={500} step={1} max={5000} defaultValue={500}
                    onChange={this.onChangeAmount}
                    value={Amount}
                    style={{ paddingTop: 15, paddingBottom: 15 }}
                  />
                </Col>
                <Col span={4}>
                  <InputNumber
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    min={500}
                    max={5000}
                    style={{ marginLeft: 16, marginTop: 15, marginBottom: 15 }}
                    value={Amount}
                    onChange={this.onChangeAmount}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <span style={{ float: 'left' }}>Loan Duration(in months):</span>
                  <Slider
                    value={duration} step={1} min={6} max={24} defaultValue={6} onChange={this.onChangeDuration} style={{ paddingTop: 15, paddingBottom: 15 }}
                  />
                </Col>
                <Col span={4}>
                  <InputNumber
                    min={6}
                    max={24}
                    style={{ marginLeft: 16, marginTop: 15, marginBottom: 15, width: 100 }}
                    value={duration}
                    onChange={this.onChangeDuration}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <div style={{ marginBottom: 16, marginTop: 24 }}>
                    <span style={{ float: 'left' }}>Monthly Payment:</span>
                    <Input addonBefore={"$"} disabled={true} value={monthly} />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <span style={{ float: 'left' }}>Interest Rate:</span>
                    <Input disabled={true} value={interest} />
                  </div>
                </Col>
              </Row>

            </Col>
          </Row>

        </Content>

      </Layout>)
  }
}
export default Calc;