import React from 'react';
import { BranchPageTemplateV2 } from '../BranchPageTemplateV2';
import { getServiceDetails, countryFlags } from './serviceDetailsHelper';
import { countryConfig } from './countryConfig';

export function FranceBranchPage() {
  const config = countryConfig.france;
  return (
    <BranchPageTemplateV2
      countryKey="france"
      countryName="France"
      countryFlag={countryFlags.france}
      registrationFee={config.registrationFee}
      processingTime={config.processingTime}
      notaryRequired={config.notaryRequired}
      heroDescription={config.heroDescription}
      serviceDetails={getServiceDetails('France', config.registrationAuthority)}
      price={config.price}
    />
  );
}

