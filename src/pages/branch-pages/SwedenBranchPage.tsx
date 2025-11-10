import React from 'react';
import { BranchPageTemplateV2 } from '../BranchPageTemplateV2';
import { getServiceDetails, countryFlags } from './serviceDetailsHelper';
import { countryConfig } from './countryConfig';

export function SwedenBranchPage() {
  const config = countryConfig.sweden;
  return (
    <BranchPageTemplateV2
      countryKey="sweden"
      countryName="Sweden"
      countryFlag={countryFlags.sweden}
      registrationFee={config.registrationFee}
      processingTime={config.processingTime}
      notaryRequired={config.notaryRequired}
      heroDescription={config.heroDescription}
      serviceDetails={getServiceDetails('Sweden', config.registrationAuthority)}
      price={config.price}
    />
  );
}

