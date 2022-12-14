import React, { useState, useEffect } from "react";
import {
  Col,
  Container,
  Row,
  Form,
  Button,
  Spinner,
  Image,
  Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../config/AuthProvider";
import axios from "axios";
import { SERVER_URL, MEMBERSHIP_PLAN } from "../config";
import "react-image-upload/dist/index.css";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import WhitdrawImage from '../assets/images/whitdraw.png';
import WalletImage from '../assets/images/wallet.jpg';
import Transfercode from '../assets/images/transfercode.png';

const MembershipPlanPage = (props) => {
  return (
    <div className="MembershipPlanPage pt-5 mt-5">
      <Container className="col-md-8 col-lg-8 col-sm-10">
        <div className="fs-1 fw-bold text-center">
          Pricing
        </div>
        <div className="fs-5-2 text-center mt-2">
          You can choose one of our subscription plans and start tracking signals.
        </div>
        <Row className="mt-5 pt-2">
          {
            Object.keys(MEMBERSHIP_PLAN).map((key) => {
              if(key == "TRYAL"){
                return;
              }
              return (
                <Col md={6} sm={12}>
                  <Card className="text-center"
                    border= { MEMBERSHIP_PLAN[key].STYLE }
                  >
                    <Card.Header> { MEMBERSHIP_PLAN[key].TITLE } </Card.Header>
                    <Card.Body className="p-5">
                        <Card.Title>{MEMBERSHIP_PLAN[key].PRICE} USDT/Mo</Card.Title>
                        <Card.Text>
                          { MEMBERSHIP_PLAN[key].TITLE }
                        </Card.Text>
                        <Button variant= { MEMBERSHIP_PLAN[key].STYLE } className="mt-4 w-100 p-2"
                          onClick={() => {
                            props.setCurplan(key);
                            props.setPage(1);
                          }}
                        >
                          Get Start
                        </Button>
                    </Card.Body>
                  </Card>
                </Col>   
              );
            })
          }
        </Row>
      </Container>
    </div>
  );
}
const SelectUSDTPage = (props) => {
  return (
    <div className="SelectUSDTPage by-5">
        <div>
          <div className="mb-3 fs-6 fw-semibold text-primary">Send USDT to Whaler Hunter App Wallet</div>
          <div className="mb-3 text-primary-1 fs-6 fw-semibold">SELECT USDT</div>
          <Image src={WhitdrawImage} />
        </div>
        <div className="d-flex justify-content-end">
          <Button className="bg-primary-1 text-white border border-0 me-3" onClick={() => {props.setPage(0)}}>Previous</Button>
          <Button className="bg-primary-1 text-white border border-0" onClick={() => {props.setPage(2)}}>Next</Button>
        </div>
    </div>
  );
}
const CopyWalletAddress = (props) => {
  return (
    <div className="CopyWalletAddress">
      <div>
          <div className="mb-3 fs-6 fw-semibold text-primary">Submit Your Subscription Fees</div>
          <div className="mb-3 text-primary-1 fs-6 fw-semibold">SEND ONLY {MEMBERSHIP_PLAN[props.curplan].PRICE}.00 USDT !NEITHER MORE NOR LESS!</div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label><small className="fw-semibold text-primary">Copy This Address</small></Form.Label>
            <Form.Control type="text" value="TSYDhPiovapPSm5vYXWCez3bEnqV9SNL7w" readOnly/>
          </Form.Group>
          <Image src={WalletImage}/>
        </div>
        <div className="d-flex justify-content-end">
          <Button className="bg-primary-1 text-white border border-0 me-3" onClick={() => {props.setPage(1)}}>Previous</Button>
          <Button className="bg-primary-1 text-white border border-0" onClick={() => {props.setPage(3)}}>Next</Button>
        </div>
    </div>
  )
}
const InputTransferCode = (props) => {
  return (
    <div className="InputTransferCode">
      <div>
          <div className="mb-3 fs-6 fw-semibold text-primary">Paste Transfer Code When Transfer Completed</div>
          <div className="mb-3 fs-6 fw-semibold text-primary">Check Wallet > Deposit & Witdrawal History</div>
          <Image src={Transfercode}/>
          <Form.Group className="my-3" controlId="formBasicEmail">
            <Form.Label><small className="fw-semibold text-primary">Transfer Code</small></Form.Label>
            <Form.Control type="text" placeholder="Transfer Code" onChange={(e) => props.setTransfercode(e.target.value)}/>
          </Form.Group>
        </div>
        <div className="d-flex justify-content-end">
          <Button className="bg-primary-1 text-white border border-0 me-3" onClick={() => {props.setPage(2)}}>Previous</Button>
          <Button className="bg-primary-1 text-white border border-0" onClick={props.submitHandler}>Submit</Button>
        </div>
    </div>
  )
}
export default function MembershipPage() {
  const { user } = useAuth();
  const [page, setPage] = useState(0);
  const [curplan, setCurplan] = useState("");
  const [transfercode, setTransfercode] = useState("");
  if (!user) {
    return <Navigate to="/login" />;
  }
  const membershipSubmitHandler = () => {
    if(transfercode == "") {
      toast.error("Please input transfercode.");
      return;
    }
    let payload = {
      plan: curplan,
      transferCode: transfercode,
      user: user  
    };
    let header = {
      'x-auth-token': user.token,
    }
    axios({
      method: 'post',
      url: SERVER_URL + '/membership/saveproposal',
      headers: header,
      data: payload
    })
    .then((response) => {
      const recvData = response.data;
      if(!recvData.status) {
        toast.error(recvData.message);
        return;
      }
      else {
        toast(recvData.message);
      }
    }).catch((e) => {
      toast.warning(e.response.data.message);
      if(e.response.status == 401) {
        window.location.replace('/login');
      }
    });
  }

  return (
    <>
      {
        page != 0 && (
          <div className="container py-5">
            <Card>
              <Card>
                <Card.Body>
                  <Card.Title className="mb-3 text-primary fs-6 fw-semibold">
                    { MEMBERSHIP_PLAN[curplan].CONTENT }
                  </Card.Title>
                  <Card.Text className="mb-5 text-warning fs-6 fw-semibold">
                    If your request is correct, it will be approved within 12 hours. To learn the TxId code, you can follow the instruction athttps://www.binance.com/en/support/faq/2c325e53daf04442adbaf8f6ba052f71. Incorrect requests will be denied.
                  </Card.Text>
                    {
                      page == 1 ? <SelectUSDTPage setPage={setPage} planKey={curplan}/> : page == 2 ? <CopyWalletAddress setPage={setPage} curplan={curplan} />
                      : <InputTransferCode setPage={setPage} curplan={curplan} transfercode={transfercode} setTransfercode={setTransfercode} submitHandler={membershipSubmitHandler}/>
                    }
                </Card.Body>
              </Card>
            </Card>
          </div>
        )
      }
      {
        page == 0 && (<MembershipPlanPage setPage={setPage} setCurplan={setCurplan}/>)
      }
      
    </>
  );
}
