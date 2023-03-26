import styled from "styled-components";
import { Button, Tabs, Row } from "antd";

export const TabsContainer = styled(Tabs)`
  .ant-tabs-nav-list {
    width: 100%;
  }
  .ant-tabs-tab {
    width: 33%;
  }
  .ant-tabs-content {
    min-height: 200px;
    max-height: auto;
  }
  .ant-form-item-label {
    text-align: start;
  }
  .ant-picker {
    width: 100%;
  }
`;

export const ButtonContainer = styled(Button)`
  text-align: center;
  float: right;
`;

export const RowForm = styled(Row)`
  padding: 10px 0;
  .ant-radio-wrapper {
    margin-left: 10px;
  }
  label {
    padding-right: 20px;
  }
  .ant-col {
    padding: 0 10px;
  }
`;
