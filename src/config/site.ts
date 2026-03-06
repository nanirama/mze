// Site configuration migrated from Gatsby config

// Environment variables configuration
// All environment variables are stored directly here
export const env = {
  // Site URL configuration
  URL: '',
  VERCEL_URL: '',
  
  // Google Sheets API configuration
  GOOGLE_PROJECT_ID: 'cm-posts',
  GOOGLE_CLIENT_ID: '102651890570600443846',
  GOOGLE_CLIENT_EMAIL: 'cm-posts@cm-posts.iam.gserviceaccount.com',
  GOOGLE_PRIVATE_KEY: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDFwOzhlanjtfkj\nzV9wsne8h/4Msm62Vfvb6MWy1MM4dlWna1WZNeKhbBk6gRf+tPZG9AjvgUGWZZSF\nhYzpEsyMlrF1YeJduJMTgCawI11zh+99UoX+7O/IrzfLimNtKysumLWtfoP5OTPS\n7Jk3FiC3BUbOLhGp5efSc0aPgwU/N3flvHsL32UYhdDzLfUrCnyWYCquq7XJ4duN\nVdn7dVbp7NORsWbN84CRZZ+p8Te2tARAKrKATcsa+ovYDcbcHanxTJ1qtW3pKZnv\natbKAUO7/D61t0RSoaUbEiNRvmN/EwtZM4fIpfeMjx/wdmCg7s5Fcx/xMEPtQUFw\nh2bjLRfXAgMBAAECggEANwcGw4UOd79Q2v4Qgz8eI3eiIW1bcmB9y4U70hXzVthS\n4Fn1QUNl025NnOKER0uaxkas39yTYCLXD8qIWejxw2NBcTzyLQsp3gDIgzXsELRw\nV2qpv7S1yp27RGe3YA7lnrs+vs7YMXcR7S0KO3JsWxFcUQ4vuxuvBPgv18ppINw0\nxxzvBpPMTLUoRo2otCkggLbmWjn3GhF5NOTHSWpY2sFb3KxxdtjLEfb38cjrBd7e\n4Vl76MrbiaLJwoaEZDBVwzn4gv+JnYjynY3MFv4yen2LPTRkH09C6tl9UvrSUu29\n1C9cwmSE5bWe6VBmQjcLkb7nh/Pm9JztDnSTSdixFQKBgQDisxbaCPsHSFN0GrVC\nIjsklLseGDCBQ5l+9Zq7lAJnycVqP/altgORtOALWtf2RGfcBtxOs16foP7fUXuz\nnb2HVTuzCn8Nd5w9fpTYfymgaO3WlQi5twWqpajryq5Km7mHLnUtjQvOkQbUtVbY\nm3HlRttWG2Tf+3pyUZN9j6CepQKBgQDfUBaYlqYx4ceXb7OQLJLU5VFed+qjtddz\ns2SAzJioJi4geEB9gvUpzWxyKmC0IY+I8rZNBwE7WKcgNrEV9s7IG3EOlGd450Pf\nBvbVK+8jO+v0bopgIju2CXRqp1Og8+nQZKWQAgsaoC5og8Hex8Q9N5Rk9/o4w5ZB\nzBX94sMvywKBgGFCfnpawgA02oEEeGGAOCmQmdrme+DpdLBQhOsXLBUFLupPuO0N\ncuiPVlPozKC+ZmSymNA3ClCoDNEYr163PToTqkI9LZdEisajSQ69N8m3WtrmI9Ex\noX++BQPsd+xQdT93AhTh33/nHqwhhLn3rty0EqQVqqihxr3HG+URutJ1AoGAKFEV\nQ0cviiHxHu4TxRvHBpjAMAYGXrgdxc3Ff1tw1CrQeRw8yGw0Ru/HfHUaMGs+tsLb\nFt0E4+oFglNddVGx037g0nkIlVNrdYCUX7gm3H2dA+xRHzoO/baHRhofhxeCRxVk\nrrMvvgbdWhEvl0EJtOOr7u62RjlJj2eBMO0XwDECgYBQTfA4MU8DJITEDrZkk9hb\nvPXNX57R0aSTgOT6SlP5gpFa0MsYhtYdm1/b01RKJ0wIqJ49ChsKQoKvFkcHKlQS\n6E4XBNyruJOO37N0rx9KfE2UV6iWJfc7V+VXWS1FWpWFNpce2Se26xPDohN3AV1k\ntg0SWWdaYWZyTeOeiQgWog==\n-----END PRIVATE KEY-----\n',
  SPREADSHEET_ID: '13A5bc7EADWpi2l9NsWY0Nr6sqHEaKFVR5i20cMY2MaU',
};

// Helper function to ensure URL has protocol
const getSiteUrl = (): string => {
  const url = env.URL || env.VERCEL_URL || 'https://www.mze.ge';
  // If URL doesn't start with http:// or https://, add https://
  if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
};

export const siteConfig = {
  // General Site Metadata
  title: 'საინფორმაციო ცენტრი',
  name: 'mze.ge',
  siteUrl: getSiteUrl(),
  description: 'Mze.ge - საინფორმაციო ცენტრი - ახალი ამბები, ტურისტული ადგილები, ბიზნეს მისამართები.',
  address: 'Tbilisi, Georgia',
  email: 'contact@mze.ge',
  phone: '+1 (888) 888-8888',

  // Site Social Media Links
  social: [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/www.mze.ge/'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/'
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/company/mze-ge/'
    }
  ],

  // Header Menu Items
  headerMenu: [
    {
      name: 'რაიონები',
      slug: '/raionebi'
    }
  ],

  // Footer Menu Items (2 Sets)
  footerMenu: [
    {
      title: 'კატეგორიები',
      items: [
        {
          name: 'სექტორები',
          slug: '/seqtorebi'
        },
        {
          name: 'რაიონები',
          slug: '/raionebi'
        }
      ]
    },
    {
      title: 'დაგვიკავშირდით',
      items: [
        {
          name: 'contact@mze.ge',
        }
      ]
    }
  ]
};
