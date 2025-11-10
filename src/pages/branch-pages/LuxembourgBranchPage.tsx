import React from 'react';
import { BranchPageTemplateV2 } from '../BranchPageTemplateV2';
import { getServiceDetails, countryFlags } from './serviceDetailsHelper';
import { countryConfig } from './countryConfig';

export function LuxembourgBranchPage() {
  const config = countryConfig.luxembourg;
  return (
    <BranchPageTemplateV2
      countryKey="luxembourg"
      countryName="Luxembourg"
      countryFlag={countryFlags.luxembourg}
      registrationFee={config.registrationFee}
      processingTime={config.processingTime}
      notaryRequired={config.notaryRequired}
      heroDescription={config.heroDescription}
      serviceDetails={getServiceDetails('Luxembourg', config.registrationAuthority)}
      price={config.price}
    />
  );
}

