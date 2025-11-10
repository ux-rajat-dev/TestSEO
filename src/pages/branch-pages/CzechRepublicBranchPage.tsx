import React from 'react';
import { BranchPageTemplateV2 } from '../BranchPageTemplateV2';
import { getServiceDetails, countryFlags } from './serviceDetailsHelper';
import { countryConfig } from './countryConfig';

export function CzechRepublicBranchPage() {
  const config = countryConfig.czechrepublic;
  return (
    <BranchPageTemplateV2
      countryKey="czechrepublic"
      countryName="Czech Republic"
      countryFlag={countryFlags.czechrepublic}
      registrationFee={config.registrationFee}
      processingTime={config.processingTime}
      notaryRequired={config.notaryRequired}
      heroDescription={config.heroDescription}
      serviceDetails={getServiceDetails('Czech Republic', config.registrationAuthority)}
      price={config.price}
    />
  );
}

