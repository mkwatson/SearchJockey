import React from 'react';
import { SlackPopUp } from './Slack';

const Admin = (): React.ReactElement => (
  <div>
    <h1>Integrations</h1>
    <SlackPopUp />
  </div>
);

export default Admin;
