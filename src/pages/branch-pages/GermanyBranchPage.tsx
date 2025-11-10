import React from 'react';
import { BranchPageTemplateV2 } from '../BranchPageTemplateV2';
import { getServiceDetails, countryFlags } from './serviceDetailsHelper';

export function GermanyBranchPage() {
  return (
    <BranchPageTemplateV2
      countryKey="germany"
      countryName="Germany"
      countryFlag={countryFlags.germany}
      registrationFee="€150 registration fee"
      processingTime="7-10 business days"
      notaryRequired={true}
      heroDescription="Germany is Europe's largest economy and a gateway to Central and Eastern European markets. Your German Branch Office gives your business instant credibility in the EU market."
      serviceDetails={getServiceDetails('Germany', 'Handelsregister (Commercial Register)')}
      price="€1,495"
    />
  );
}

