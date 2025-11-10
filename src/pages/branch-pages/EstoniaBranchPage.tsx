import React from 'react';
import { BranchPageTemplateV2 } from '../BranchPageTemplateV2';
import { getServiceDetails, countryFlags } from './serviceDetailsHelper';
import { countryConfig } from './countryConfig';

export function EstoniaBranchPage() {
  const config = countryConfig.estonia;
  return (
    <BranchPageTemplateV2
      countryKey="estonia"
      countryName="Estonia"
      countryFlag={countryFlags.estonia}
      registrationFee={config.registrationFee}
      processingTime={config.processingTime}
      notaryRequired={config.notaryRequired}
      heroDescription={config.heroDescription}
      serviceDetails={getServiceDetails('Estonia', config.registrationAuthority)}
      price={config.price}
    />
  );
}

