import React from 'react';
import { BranchPageTemplateV2 } from '../BranchPageTemplateV2';
import { getServiceDetails, countryFlags } from './serviceDetailsHelper';
import { countryConfig } from './countryConfig';

export function AustriaBranchPage() {
  const config = countryConfig.austria;
  return (
    <BranchPageTemplateV2
      countryKey="austria"
      countryName="Austria"
      countryFlag={countryFlags.austria}
      registrationFee={config.registrationFee}
      processingTime={config.processingTime}
      notaryRequired={config.notaryRequired}
      heroDescription={config.heroDescription}
      serviceDetails={getServiceDetails('Austria', config.registrationAuthority)}
      price={config.price}
    />
  );
}

