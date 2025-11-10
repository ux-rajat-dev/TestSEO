import React from 'react';
import { BranchPageTemplateV2 } from '../BranchPageTemplateV2';
import { getServiceDetails, countryFlags } from './serviceDetailsHelper';
import { countryConfig } from './countryConfig';

export function LithuaniaBranchPage() {
  const config = countryConfig.lithuania;
  return (
    <BranchPageTemplateV2
      countryKey="lithuania"
      countryName="Lithuania"
      countryFlag={countryFlags.lithuania}
      registrationFee={config.registrationFee}
      processingTime={config.processingTime}
      notaryRequired={config.notaryRequired}
      heroDescription={config.heroDescription}
      serviceDetails={getServiceDetails('Lithuania', config.registrationAuthority)}
      price={config.price}
    />
  );
}

