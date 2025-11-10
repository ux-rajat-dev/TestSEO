import React from 'react';
import { BranchPageTemplateV2 } from '../BranchPageTemplateV2';
import { getServiceDetails, countryFlags } from './serviceDetailsHelper';
import { countryConfig } from './countryConfig';

export function SlovakiaBranchPage() {
  const config = countryConfig.slovakia;
  return (
    <BranchPageTemplateV2
      countryKey="slovakia"
      countryName="Slovakia"
      countryFlag={countryFlags.slovakia}
      registrationFee={config.registrationFee}
      processingTime={config.processingTime}
      notaryRequired={config.notaryRequired}
      heroDescription={config.heroDescription}
      serviceDetails={getServiceDetails('Slovakia', config.registrationAuthority)}
      price={config.price}
    />
  );
}

