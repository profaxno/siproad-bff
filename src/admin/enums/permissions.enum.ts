export enum PermissionsEnum {
  // * MODULE:SUB-MODULE:PERMISSION
  SIPROAD_ADMIN          = 'SIPROAD:ALL:MANAGE',

  ADMIN_AUTH_LOGIN       = 'ADMIN:AUTH:LOGIN', 

  ADMIN_COMPANY_READ     = 'ADMIN:COMPANY:READ',
  ADMIN_COMPANY_WRITE    = 'ADMIN:COMPANY:WRITE',
  ADMIN_USER_READ        = 'ADMIN:USER:READ',
  ADMIN_USER_WRITE       = 'ADMIN:USER:WRITE',
  ADMIN_ROLE_READ        = 'ADMIN:ROLE:READ',
  ADMIN_ROLE_WRITE       = 'ADMIN:ROLE:WRITE',

  PRODUCTS_ADMIN_SETUP   = 'PRODUCTS:ADMIN:SETUP', // * CREATE PRODUCT-TYPES, ELEMENT-TYPES
  PRODUCTS_PRODUCT_READ  = 'PRODUCTS:PRODUCT:READ',
  PRODUCTS_PRODUCT_WRITE = 'PRODUCTS:PRODUCT:WRITE',
  PRODUCTS_ELEMENT_READ  = 'PRODUCTS:ELEMENT:READ',
  PRODUCTS_ELEMENT_WRITE = 'PRODUCTS:ELEMENT:WRITE',
  PRODUCTS_FORMULA_READ  = 'PRODUCTS:FORMULA:READ',
  PRODUCTS_FORMULA_WRITE = 'PRODUCTS:FORMULA:WRITE',

  SALES_ADMIN_SETUP      = 'SALES:ADMIN:SETUP', // * CREATE ORDER-TYPES, PAYMENT-TYPES
  SALES_ORDER_READ       = 'SALES:ORDER:READ',
  SALES_ORDER_WRITE      = 'SALES:ORDER:WRITE',
  SALES_CUSTOMER_READ    = 'SALES:CUSTOMER:READ',
  SALES_CUSTOMER_WRITE   = 'SALES:CUSTOMER:WRITE',

  EXPENSES_ADMIN_SETUP   = 'EXPENSES:ADMIN:SETUP', // * CREATE EXPENSE-TYPES, DOCUMENT-TYPES
  EXPENSES_EXPENSE_READ  = 'EXPENSES:EXPENSE:READ',
  EXPENSES_EXPENSE_WRITE = 'EXPENSES:EXPENSE:WRITE',
  EXPENSES_PROVIDER_READ = 'EXPENSES:PROVIDER:READ',
  EXPENSES_PROVIDER_WRITE= 'EXPENSES:PROVIDER:WRITE'
  
}