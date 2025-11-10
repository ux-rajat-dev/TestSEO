import React from 'react';
import { BranchPageTemplateV2 } from '../BranchPageTemplateV2';
import { getServiceDetails, countryFlags } from './serviceDetailsHelper';
import { countryConfig } from './countryConfig';

export function CyprusBranchPage() {
  const config = countryConfig.cyprus;
  return (
    <BranchPageTemplateV2
      countryKey="cyprus"
      countryName="Cyprus"
      countryFlag={countryFlags.cyprus}
      registrationFee={config.registrationFee}
      processingTime={config.processingTime}
      notaryRequired={config.notaryRequired}
      heroDescription={config.heroDescription}
      serviceDetails={getServiceDetails('Cyprus', config.registrationAuthority)}
      price={config.price}
    />
  );
}

