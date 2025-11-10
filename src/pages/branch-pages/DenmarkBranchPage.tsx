import React from 'react';
import { BranchPageTemplateV2 } from '../BranchPageTemplateV2';
import { getServiceDetails, countryFlags } from './serviceDetailsHelper';
import { countryConfig } from './countryConfig';

export function DenmarkBranchPage() {
  const config = countryConfig.denmark;
  return (
    <BranchPageTemplateV2
      countryKey="denmark"
      countryName="Denmark"
      countryFlag={countryFlags.denmark}
      registrationFee={config.registrationFee}
      processingTime={config.processingTime}
      notaryRequired={config.notaryRequired}
      heroDescription={config.heroDescription}
      serviceDetails={getServiceDetails('Denmark', config.registrationAuthority)}
      price={config.price}
    />
  );
}

