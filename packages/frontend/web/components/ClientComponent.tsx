import React from 'react';

const ClientComponent: React.FC<{ hello: string }> = ({ hello }) => (
    <h1>hello frends {hello}</h1>
);
// tslint:disable-next-line: no-default-export
export default ClientComponent;
