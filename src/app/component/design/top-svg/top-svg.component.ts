import { Component } from '@angular/core';
import { ThemeDesignSettings } from '../../../data/theme/theme.data';
import { ThemeService } from '../../../service/theme/theme.service';

@Component( {
  selector: 'app-top-svg',
  templateUrl: './top-svg.component.html',
  styleUrls: [ './top-svg.component.scss' ]
} )
export class TopSvgComponent {

  themeDesignSetting;

  ThemeDesignSettings = ThemeDesignSettings;

  constructor(
      private themeService: ThemeService
  ) {
    this.themeService.themeDesignSetting.subscribe( themeDesignSetting => this.themeDesignSetting = themeDesignSetting );
  }
}
