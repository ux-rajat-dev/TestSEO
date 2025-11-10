import React from 'react';
import { BranchPageTemplateV2 } from '../BranchPageTemplateV2';
import { getServiceDetails, countryFlags } from './serviceDetailsHelper';

export function BelgiumBranchPage() {
  return (
    <BranchPageTemplateV2
      countryKey="belgium"
      countryName="Belgium"
      countryFlag={countryFlags.belgium}
      registrationFee="€100 CBE registration fee"
      processingTime="5-7 business days"
      notaryRequired={false}
      heroDescription="Belgium offers excellent connectivity to major European markets and a multilingual business environment. Your Belgian Branch Office gives your business instant credibility in the EU market."
      serviceDetails={getServiceDetails('Belgium', 'CBE (Crossroads Bank for Enterprises)')}
      price="€1,495"
    />
  );
}

