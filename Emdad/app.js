(function () {
  "use strict";

  const translations = {
    ar: {
      brand: "إمداد", tagline: "كل احتياجات شركتك من مصدر واحد", nav_home: "الرئيسية",
      nav_shop: "المتجر", nav_cart: "السلة", nav_dashboard: "بوابة الشركة",
      nav_sign_in: "تسجيل الدخول", nav_sign_out: "تسجيل الخروج", language: "English",
      seller_center: "مركز البائع", operations_center: "إدارة العمليات",
      hero_eyebrow: "سوق الأعمال الموثوق في مصر", hero_title: "كل ما تحتاجه شركتك. من موردين موثوقين.",
      hero_body: "اكتشف مستلزمات الصناعة والشركات، قارن الكميات، واطلب بثقة مع الدفع عند الاستلام.",
      browse_categories: "استكشف الفئات", browse_products: "تصفح المنتجات",
      categories_title: "احتياجات كل قطاع في مكان واحد", categories_loading: "جارٍ تحميل الفئات…",
      categories_empty: "ستظهر الفئات هنا بعد اعتماد الموردين والمنتجات.",
      catalog_eyebrow: "سوق إمداد", shop_title: "مستلزمات الأعمال", shop_subtitle: "منتجات الموردين المعتمدين فقط. الأسعار بالجنيه المصري.",
      search_label: "ابحث عن منتج", category_filter: "الفئة", all_categories: "كل الفئات",
      sort_label: "ترتيب حسب", sort_newest: "الأحدث", sort_price_asc: "السعر: الأقل أولًا",
      sort_price_desc: "السعر: الأعلى أولًا", search_button: "بحث", load_more: "عرض المزيد",
      empty_products: "لا توجد منتجات مطابقة حاليًا. جرّب عبارة أو فئة أخرى.",
      out_of_stock: "غير متوفر", min_qty: "الحد الأدنى", from_price: "يبدأ من",
      sold_by: "المورد", city: "المدينة", shipping: "الشحن", vat: "ضريبة القيمة المضافة",
      vat_goods_only: "على المنتجات فقط", quantity: "الكمية", add_to_cart: "أضف للسلة",
      request_quote: "اطلب سعرًا خاصًا", price_tiers: "أسعار الكميات",
      specifications: "المواصفات", description: "التفاصيل", available: "متاح",
      back_to_shop: "العودة للمتجر", cart_title: "سلة المشتريات",
      cart_estimate_note: "الأسعار المعروضة تقديرية؛ يعيد الخادم احتساب السعر والمخزون عند تأكيد الطلب.",
      cart_empty: "سلتك فارغة حاليًا.", remove: "إزالة", estimated_subtotal: "قيمة المنتجات التقديرية",
      estimated_vat: "الضريبة التقديرية", estimated_shipping: "الشحن التقديري",
      estimated_total: "الإجمالي التقديري", delivery_details: "بيانات التوصيل",
      delivery_name: "اسم المستلم", delivery_phone: "رقم الهاتف", delivery_address: "العنوان بالتفصيل",
      place_order: "تأكيد الطلب بالدفع عند الاستلام", order_success: "تم استلام طلبك. رقم الطلب: ",
      checkout_requires_login: "سجّل الدخول وتأكد من ملف شركتك لإتمام الطلب.",
      order_failed: "تعذّر إتمام الطلب. تحقق من المخزون والشركة وبيانات التوصيل.",
      requests_title: "طلبات التوريد الخاصة", requests_intro: "أرسل المواصفات والكميات التي تحتاجها، وسيتابع فريق المشتريات طلبك.",
      request_title_label: "عنوان الطلب", request_description_label: "تفاصيل وموعد التوريد",
      request_items: "بنود ومواصفات الطلب", add_request_item: "إضافة بند", request_item_placeholder: "المواصفات المطلوبة",
      request_quantity_placeholder: "الكمية", request_unit_placeholder: "الوحدة",
      request_attachments: "مرفقات اختيارية (PDF أو صورة، حتى 25 ميجابايت)",
      submit_request: "إرسال الطلب", request_success: "تم إرسال طلبك. رقم المتابعة: ",
      request_partial_upload: "تم إنشاء الطلب، لكن تعذّر رفع أحد المرفقات. يمكنك إعادة المحاولة أو التواصل مع الفريق.",
      my_requests: "طلباتي السابقة", request_submit_error: "تعذّر إرسال الطلب. تحقق من البيانات وحاول مرة أخرى.",
      auth_title: "حساب شركتك", auth_sign_in: "تسجيل الدخول", auth_sign_up: "إنشاء حساب مشتري",
      auth_name: "الاسم الكامل", auth_email: "البريد الإلكتروني", auth_password: "كلمة المرور",
      auth_switch_signup: "جديد في إمداد؟ أنشئ حسابًا", auth_switch_signin: "لديك حساب بالفعل؟ سجّل الدخول",
      auth_signup_success: "تم إنشاء الحساب. تحقق من بريدك إذا كان التأكيد مفعّلًا، ثم سجّل الدخول.",
      auth_error: "تعذّر إكمال تسجيل الدخول. يُرجى المحاولة مرة أخرى.",
      auth_google: "المتابعة باستخدام Google", auth_or: "أو",
      config_missing: "أضف رابط مشروع Supabase ومفتاح anon إلى ملف config.js بجوار index.html.",
      onboarding_title: "تسجيل شركتك", onboarding_body: "تُحفظ بيانات الشركة بأمان. ويتولى فريق إمداد إدارة حالة التحقق.",
      company_name: "اسم الشركة", company_tax_id: "رقم التسجيل الضريبي المصري (اختياري)",
      company_city: "المدينة", onboarding_submit: "حفظ الشركة", onboarding_error: "تعذّر تسجيل الشركة.",
      dashboard_title: "بوابة الشركة", dashboard_body: "تابع طلباتك وملف شركتك.",
      verification_pending: "بانتظار التحقق", verification_verified: "تم التحقق",
      verification_rejected: "مرفوض", verification_under_review: "قيد المراجعة",
      verification_suspended: "موقوف", no_company: "لا يوجد ملف شركة بعد.",
      create_company: "تسجيل شركة", loading: "جارٍ التحميل…", error_loading: "تعذّر تحميل البيانات.",
      footer_note: "إمداد · سوق مستلزمات الأعمال في مصر · الجنيه المصري",
      request_failed: "حدث خطأ. تحقق من الاتصال والإعدادات ثم حاول مرة أخرى.",
      my_orders: "طلباتي", become_seller: "ابدأ البيع", seller_apply_note: "يجب التحقق من الشركة قبل تفعيل المتجر.",
      seller_intro: "أدر منتجات متجرك وطلبات عملائك.", select_company: "الشركة المعتمدة",
      store_name: "اسم المتجر", store_description: "نبذة عن المتجر", apply_seller: "تقديم طلب متجر",
      seller_pending: "طلب المتجر قيد المراجعة", seller_products: "المنتجات", seller_orders: "الطلبات",
      add_product: "إضافة منتج", product_form_title: "بيانات المنتج",
      product_name_ar: "اسم المنتج بالعربية", product_name_en: "Product name in English",
      product_brand: "العلامة التجارية", product_sku: "رمز المنتج", product_unit: "وحدة البيع",
      product_price: "سعر الوحدة (ج.م)", product_min_qty: "الحد الأدنى للطلب",
      product_stock: "المخزون", product_shipping: "الشحن لكل بند (ج.م)", product_vat: "ضريبة القيمة المضافة",
      product_images: "صور المنتج (حتى 8 صور، PNG/JPG/WebP، 5 ميجابايت للصورة)",
      product_description_ar: "الوصف بالعربية", product_description_en: "Description in English",
      product_specs: "المواصفات (سطر لكل خاصية: الاسم: القيمة)",
      product_tiers: "أسعار الكميات (كل سطر: الحد الأدنى، السعر)",
      commission_hint: "تُحسب العمولة على قيمة المنتجات فقط، ويحددها إعداد الفئة أو المتجر.",
      save_product: "حفظ المنتج", cancel: "إلغاء", edit: "تعديل",
      review_pending: "بانتظار المراجعة", review_approved: "معتمد", review_rejected: "مرفوض",
      product_saved: "تم حفظ المنتج وأُرسل للمراجعة عند تغيير بياناته.", seller_orders_empty: "لا توجد طلبات لهذا المتجر بعد.",
      buyer_orders_empty: "لا توجد طلبات بعد.", order_status_new: "جديد", order_status_confirmed: "مؤكد",
      order_status_shipped: "تم الشحن", order_status_delivered: "تم التسليم", order_status_cancelled: "ملغي",
      cancel_order: "إلغاء الطلب", confirm_order: "تأكيد", ship_order: "تحديد كمشحون",
      deliver_order: "تحديد كمُسلّم", commission_due: "العمولة المستحقة",
      operations_intro: "أدوات العمل حسب صلاحيات حسابك.", product_reviews: "مراجعة المنتجات",
      seller_applications: "طلبات البائعين", company_verification: "التحقق من الشركات",
      approve: "اعتماد", reject: "رفض", verify: "تأكيد التحقق", suspend: "إيقاف",
      request_status_submitted: "مُرسل", request_status_under_review: "قيد المراجعة",
      request_status_clarification_needed: "مطلوب توضيح", request_status_sourcing: "جارٍ البحث عن مورد",
      request_status_quoted: "تم إعداد عرض السعر", request_status_accepted: "مقبول",
      request_status_declined: "مرفوض", request_status_cancelled: "ملغي", request_status_closed: "مغلق",
      update_request: "تحديث الطلب", customer_note: "ملاحظة تظهر للعميل",
      internal_notes: "ملاحظات داخلية (للفريق فقط)", assign_to_me: "إسناد إليّ",
      urgent: "عاجل", operations_empty: "لا توجد عناصر لمراجعتها.", request_tracking: "رقم المتابعة",
      request_submitted: "تم إرسال الطلب", save_product_error: "تعذّر حفظ المنتج.",
      seller_apply_error: "تعذّر تقديم طلب المتجر. تحقق من اعتماد الشركة.",
      attachment_error: "تعذّر رفع المرفق.", continue_shopping: "متابعة التسوق",
      status: "الحالة", total: "الإجمالي", store: "المتجر", order_number: "طلب رقم",
      product: "المنتج", sold_unit: "للوحدة", estimates_only: "تقديري فقط",
      why_emdad: "توريد الأعمال بثقة", why_emdad_body: "كتالوج واضح، موردون معتمدون، وتسعير حسب الكمية.",
      how_it_works: "كيف يعمل إمداد", step_browse: "اكتشف المنتجات", step_compare: "قارن المواصفات والكميات",
      step_order: "أرسل طلبك", step_receive: "استلم من المورد",
      platform_categories: "فئات تخدم أعمالك", search_products: "ابحث عن المنتجات",
      category_a: "المواد الخام الصناعية", category_b: "قطع الغيار", category_c: "المستلزمات الكهربائية",
      category_d: "التعبئة والتغليف", category_e: "الأدوات والسلامة",
      category_f: "مستلزمات الشركات والمكاتب", category_g: "الخدمات اللوجستية والصناعية",
      value_materials: "ابحث عن المواد والمكونات التي تحتاجها منشأتك.",
      value_parts: "قارن خيارات الموردين واطلب بالكميات المناسبة.",
      value_supply: "اطلب احتياجات شركتك من منصة واحدة.",
      faq_title: "أسئلة شائعة", faq_payment_q: "كيف يتم الدفع عند الإطلاق؟",
      faq_payment_a: "الدفع عند الاستلام؛ يسجل كل مورد حالة طلبه.",
      faq_seller_q: "هل يمكن لشركتي الشراء والبيع؟",
      faq_seller_a: "نعم، بعد التحقق من الشركة واعتماد المتجر.",
      faq_request_q: "ماذا أفعل إذا لم أجد المنتج؟",
      faq_request_a: "أرسل طلب توريد خاصًا بالمواصفات والكميات المطلوبة.",
      manage_categories: "إدارة الفئات", manage_users: "إدارة المستخدمين",
      finance_settlement: "تسوية العمولات", category_slug: "الرابط المختصر",
      commission_pct: "نسبة العمولة %", category_active: "فئة نشطة",
      add_category: "إضافة فئة", save_category: "حفظ الفئة", user_role: "الدور",
      role_buyer: "مشتري", role_super_admin: "مدير النظام",
      role_procurement_manager: "مدير المشتريات", role_procurement_employee: "موظف مشتريات",
      role_sales_manager: "مدير المبيعات", role_finance_manager: "مدير المالية",
      role_operations_manager: "مدير العمليات", role_quality_manager: "مدير الجودة",
      change_role: "تغيير الدور", settle: "تسوية", settled: "تمت التسوية",
      no_commissions: "لا توجد عمولات مستحقة للتسوية.", per_unit_net: "صافي البائع بعد العمولة",
      categories: "الفئات", store_pending: "بانتظار اعتماد المتجر"
    },
    en: {
      brand: "EMDAD", tagline: "Every Business Need. One Trusted Source.", nav_home: "Home",
      nav_shop: "Shop", nav_cart: "Cart", nav_dashboard: "Company portal", nav_sign_in: "Sign in",
      nav_sign_out: "Sign out", language: "العربية", seller_center: "Seller center",
      operations_center: "Operations", hero_eyebrow: "Egypt's trusted business marketplace",
      hero_title: "Everything your business needs. From suppliers you can trust.",
      hero_body: "Discover industrial and corporate supplies, compare quantity pricing, and order with confidence.",
      browse_categories: "Explore categories", browse_products: "Browse products",
      categories_title: "Business essentials, all in one place", categories_loading: "Loading categories…",
      categories_empty: "Categories will appear here as approved sellers and products join EMDAD.",
      catalog_eyebrow: "EMDAD MARKETPLACE", shop_title: "Business supplies",
      shop_subtitle: "Products from approved suppliers. Prices in Egyptian pounds.",
      search_label: "Search products", category_filter: "Category", all_categories: "All categories",
      sort_label: "Sort by", sort_newest: "Newest", sort_price_asc: "Price: low to high",
      sort_price_desc: "Price: high to low", search_button: "Search", load_more: "Load more",
      empty_products: "No matching products yet. Try another search or category.",
      out_of_stock: "Out of stock", min_qty: "Minimum order", from_price: "From",
      sold_by: "Supplier", city: "City", shipping: "Shipping", vat: "VAT",
      vat_goods_only: "on goods only", quantity: "Quantity", add_to_cart: "Add to cart",
      request_quote: "Request a quote", price_tiers: "Quantity pricing", specifications: "Specifications",
      description: "Details", available: "available", back_to_shop: "Back to shop",
      cart_title: "Your cart", cart_estimate_note: "Prices are estimates; the server recalculates price and stock when you place the order.",
      cart_empty: "Your cart is empty.", remove: "Remove", estimated_subtotal: "Estimated goods",
      estimated_vat: "Estimated VAT", estimated_shipping: "Estimated shipping", estimated_total: "Estimated total",
      delivery_details: "Delivery details", delivery_name: "Recipient name", delivery_phone: "Phone number",
      delivery_address: "Full address", place_order: "Place COD order", order_success: "Order received. Order ID: ",
      checkout_requires_login: "Sign in and register a verified company before checkout.",
      order_failed: "Could not place the order. Check stock, company verification, and delivery details.",
      requests_title: "Special sourcing requests",
      requests_intro: "Send your specifications and quantities; our procurement team will follow up.",
      request_title_label: "Request title", request_description_label: "Details and requested delivery date",
      request_items: "Requested items and specifications", add_request_item: "Add item",
      request_item_placeholder: "Required specifications", request_quantity_placeholder: "Quantity",
      request_unit_placeholder: "Unit", request_attachments: "Optional attachments (PDF or image, up to 25 MB)",
      submit_request: "Submit request", request_success: "Request submitted. Tracking number: ",
      request_partial_upload: "Request created, but an attachment could not be uploaded. Retry or contact the team.",
      my_requests: "Previous requests", request_submit_error: "Could not submit the request. Check the details and retry.",
      auth_title: "Your company account", auth_sign_in: "Sign in", auth_sign_up: "Create buyer account",
      auth_name: "Full name", auth_email: "Email", auth_password: "Password",
      auth_switch_signup: "New to EMDAD? Create an account",
      auth_switch_signin: "Already registered? Sign in",
      auth_signup_success: "Account created. Check your email if confirmation is enabled, then sign in.",
      auth_error: "We could not complete authentication. Please try again.",
      auth_google: "Continue with Google", auth_or: "or",
      config_missing: "Add your Supabase URL and anon key to config.js next to index.html.",
      onboarding_title: "Register your company",
      onboarding_body: "Company details are stored securely. Verification status is managed by EMDAD staff.",
      company_name: "Company name", company_tax_id: "Egyptian tax registration number (optional)",
      company_city: "City", onboarding_submit: "Save company",
      onboarding_error: "Company registration failed.", dashboard_title: "Company portal",
      dashboard_body: "Track your orders and company profile.", verification_pending: "Pending verification",
      verification_verified: "Verified", verification_rejected: "Rejected",
      verification_under_review: "Under review", verification_suspended: "Suspended",
      no_company: "No company profile yet.", create_company: "Register a company",
      loading: "Loading…", error_loading: "Could not load information.",
      footer_note: "EMDAD · Business supplies marketplace in Egypt · EGP",
      request_failed: "Something went wrong. Check your connection and configuration, then retry.",
      my_orders: "My orders", become_seller: "Start selling",
      seller_apply_note: "Your company must be verified before a store can be activated.",
      seller_intro: "Manage your products and customer orders.", select_company: "Verified company",
      store_name: "Store name", store_description: "Store description", apply_seller: "Apply for a store",
      seller_pending: "Store application is under review", seller_products: "Products",
      seller_orders: "Orders", add_product: "Add product", product_form_title: "Product details",
      product_name_ar: "Product name in Arabic", product_name_en: "Product name in English",
      product_brand: "Brand", product_sku: "SKU", product_unit: "Selling unit",
      product_price: "Unit price (EGP)", product_min_qty: "Minimum order quantity",
      product_stock: "Stock", product_shipping: "Shipping per line (EGP)", product_vat: "VAT",
      product_images: "Product images (up to 8, PNG/JPG/WebP, 5 MB each)",
      product_description_ar: "Arabic description", product_description_en: "English description",
      product_specs: "Specifications (one per line: name: value)",
      product_tiers: "Quantity prices (one per line: minimum quantity, price)",
      commission_hint: "Commission is applied to goods only and is set by the category or store.",
      save_product: "Save product", cancel: "Cancel", edit: "Edit",
      review_pending: "Pending review", review_approved: "Approved", review_rejected: "Rejected",
      product_saved: "Product saved. Changes to its details require review.",
      seller_orders_empty: "This store has no orders yet.", buyer_orders_empty: "No orders yet.",
      order_status_new: "New", order_status_confirmed: "Confirmed", order_status_shipped: "Shipped",
      order_status_delivered: "Delivered", order_status_cancelled: "Cancelled", cancel_order: "Cancel order",
      confirm_order: "Confirm", ship_order: "Mark shipped", deliver_order: "Mark delivered",
      commission_due: "Commission due", operations_intro: "Tools available to your staff role.",
      product_reviews: "Product reviews", seller_applications: "Seller applications",
      company_verification: "Company verification", approve: "Approve", reject: "Reject",
      verify: "Verify", suspend: "Suspend", request_status_submitted: "Submitted",
      request_status_under_review: "Under review", request_status_clarification_needed: "Clarification needed",
      request_status_sourcing: "Sourcing", request_status_quoted: "Quoted", request_status_accepted: "Accepted",
      request_status_declined: "Declined", request_status_cancelled: "Cancelled",
      request_status_closed: "Closed", update_request: "Update request",
      customer_note: "Customer-visible note", internal_notes: "Internal team notes",
      assign_to_me: "Assign to me", urgent: "Urgent", operations_empty: "Nothing to review.",
      request_tracking: "Tracking", request_submitted: "Request submitted",
      save_product_error: "Could not save the product.", seller_apply_error: "Could not apply. Verify your company first.",
      attachment_error: "Could not upload the attachment.", continue_shopping: "Continue shopping",
      status: "Status", total: "Total", store: "Store", order_number: "Order",
      product: "Product", sold_unit: "per", estimates_only: "Estimate only",
      why_emdad: "Business sourcing, with confidence",
      why_emdad_body: "Clear catalogues, verified suppliers, and quantity pricing.",
      how_it_works: "How EMDAD works", step_browse: "Discover products",
      step_compare: "Compare specifications and quantities", step_order: "Place your order",
      step_receive: "Receive from the supplier", platform_categories: "Categories for every business",
      search_products: "Explore products", category_a: "Industrial Raw Materials",
      category_b: "Spare Parts", category_c: "Electrical", category_d: "Packaging",
      category_e: "Tools & Safety", category_f: "Corporate & Office", category_g: "Logistics & Services",
      value_materials: "Find the materials and components your facility needs.",
      value_parts: "Compare suppliers and order quantities that suit your business.",
      value_supply: "Source your business essentials from one marketplace.",
      faq_title: "Frequently asked questions", faq_payment_q: "How do I pay at launch?",
      faq_payment_a: "Cash on delivery; each supplier records their order status.",
      faq_seller_q: "Can my company buy and sell?",
      faq_seller_a: "Yes, after the company is verified and its store is approved.",
      faq_request_q: "What if I cannot find an item?",
      faq_request_a: "Submit a sourcing request with your specifications and quantities.",
      manage_categories: "Categories", manage_users: "Users",
      finance_settlement: "Commission settlement", category_slug: "URL slug",
      commission_pct: "Commission %", category_active: "Category active",
      add_category: "Add category", save_category: "Save category", user_role: "Role",
      role_buyer: "Buyer", role_super_admin: "Super admin",
      role_procurement_manager: "Procurement manager", role_procurement_employee: "Procurement employee",
      role_sales_manager: "Sales manager", role_finance_manager: "Finance manager",
      role_operations_manager: "Operations manager", role_quality_manager: "Quality manager",
      change_role: "Change role", settle: "Settle", settled: "Settled",
      no_commissions: "No commissions are due for settlement.", per_unit_net: "Seller net after commission",
      categories: "Categories", store_pending: "Awaiting store approval"
    }
  };

  const config = window.EMDAD_CONFIG || {};
  const supabaseUrl = String(config.SUPABASE_URL || "").replace(/\/+$/, "");
  const anonKey = String(config.SUPABASE_ANON_KEY || "");
  const configured = Boolean(supabaseUrl && anonKey);
  const sessionKey = "emdad-auth-session";
  const cartKey = "emdad-cart";
  const catalogPageSize = 24;
  let locale = readLocale();
  let session = readSession();
  let registering = false;
  let categories = [];
  let currentProduct = null;
  let currentProductImages = [];
  let sellerStores = [];
  let selectedSellerId = null;
  let catalogOffset = 0;
  let catalogHasMore = false;
  let requestProductId = null;
  let userProfile = null;
  let staffRole = "buyer";

  function readLocale() {
    try { return localStorage.getItem("emdad-locale") === "en" ? "en" : "ar"; }
    catch (error) { console.warn("Could not read the saved language.", error); return "ar"; }
  }

  function readSession() {
    try {
      const saved = sessionStorage.getItem(sessionKey);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error("Could not restore the sign-in session.", error);
      return null;
    }
  }

  function readCart() {
    try {
      const saved = JSON.parse(localStorage.getItem(cartKey) || "[]");
      return Array.isArray(saved) ? saved.filter((line) => line && typeof line.id === "string" && Number.isInteger(line.quantity) && line.quantity > 0) : [];
    } catch (error) {
      console.warn("Could not restore the cart.", error);
      return [];
    }
  }

  let cart = readCart();

  function saveSession(nextSession) {
    session = nextSession;
    try {
      if (nextSession) sessionStorage.setItem(sessionKey, JSON.stringify(nextSession));
      else sessionStorage.removeItem(sessionKey);
    } catch (error) {
      console.error("Could not save the sign-in session.", error);
    }
    updateNavigation();
  }

  function saveCart() {
    try { localStorage.setItem(cartKey, JSON.stringify(cart)); }
    catch (error) { console.error("Could not save the cart.", error); }
    updateCartCount();
  }

  function t(key) { return translations[locale][key] || key; }

  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
  }

  function showMessage(element, message) {
    if (!element) return;
    element.textContent = message;
    element.hidden = !message;
  }

  function formatPrice(value) {
    return new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-EG", {
      style: "currency", currency: "EGP", maximumFractionDigits: 2
    }).format(Number(value || 0));
  }

  function mapError(error, fallback) {
    const raw = String(error && (error.message || error.details) || "");
    const codes = {
      OUT_OF_STOCK: locale === "ar" ? "الكمية المطلوبة غير متوفرة بالمخزون." : "Requested quantity is out of stock.",
      BELOW_MIN_QTY: locale === "ar" ? "الكمية أقل من الحد الأدنى للطلب." : "Quantity is below the minimum order.",
      OWN_PRODUCT: locale === "ar" ? "لا يمكن شراء منتجات متجرك." : "You cannot order products from your own store.",
      PRODUCT_UNAVAILABLE: locale === "ar" ? "أحد المنتجات لم يعد متاحًا." : "A product is no longer available.",
      VERIFIED_BUYER_COMPANY_REQUIRED: t("checkout_requires_login"),
      VERIFIED_COMPANY_OWNER_REQUIRED: t("seller_apply_error"),
      INVALID_TRANSITION: locale === "ar" ? "لا يمكن تنفيذ هذا الانتقال في حالة الطلب الحالية." : "That status transition is not allowed.",
      INVALID_REQUEST_TRANSITION: locale === "ar" ? "لا يمكن تنفيذ هذا الانتقال في حالة الطلب الحالية." : "That request status transition is not allowed.",
      FINANCE_ROLE_REQUIRED: locale === "ar" ? "هذا الإجراء مخصص لفريق المالية." : "This action requires a finance role."
    };
    const match = raw.match(/(OUT_OF_STOCK|BELOW_MIN_QTY|OWN_PRODUCT|PRODUCT_UNAVAILABLE|VERIFIED_BUYER_COMPANY_REQUIRED|VERIFIED_COMPANY_OWNER_REQUIRED|INVALID_TRANSITION|INVALID_REQUEST_TRANSITION|FINANCE_ROLE_REQUIRED)/);
    return match && codes[match[1]] ? codes[match[1]] : fallback;
  }

  async function refreshSession() {
    if (!session || !session.refresh_token) return false;
    const response = await fetch(supabaseUrl + "/auth/v1/token?grant_type=refresh_token", {
      method: "POST",
      headers: { apikey: anonKey, "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: session.refresh_token })
    });
    if (!response.ok) {
      saveSession(null);
      return false;
    }
    saveSession(await response.json());
    return true;
  }

  async function api(path, options) {
    if (!configured) throw new Error(t("config_missing"));
    const request = options || {};
    const send = () => fetch(supabaseUrl + path, {
      method: request.method || "GET",
      headers: {
        apikey: anonKey,
        Authorization: "Bearer " + (session ? session.access_token : anonKey),
        "Content-Type": "application/json",
        ...(request.headers || {})
      },
      body: request.body === undefined ? undefined : JSON.stringify(request.body)
    });
    let response = await send();
    if (response.status === 401 && session && await refreshSession()) response = await send();
    const text = await response.text();
    let data = null;
    if (text) {
      try { data = JSON.parse(text); } catch { data = text; }
    }
    if (!response.ok) {
      const message = data && (data.message || data.msg || data.error_description || data.error);
      throw new Error(message || "HTTP " + response.status);
    }
    return data;
  }

  function endpoint(path, query) {
    const params = new URLSearchParams(query || {});
    return path + (params.size ? "?" + params.toString() : "");
  }

  function updateNavigation() {
    const authenticated = Boolean(session);
    document.getElementById("dashboard-link").hidden = !authenticated;
    document.getElementById("auth-link").hidden = authenticated;
    document.getElementById("signout-button").hidden = !authenticated;
    document.getElementById("seller-link").hidden = !authenticated;
    document.getElementById("staff-link").hidden = !authenticated || staffRole === "buyer";
    updateCartCount();
  }

  function updateCartCount() {
    document.getElementById("cart-count").textContent = String(cart.reduce((sum, line) => sum + line.quantity, 0));
  }

  function navigateTo(target, replace) {
    let value = String(target || "/");
    if (value.startsWith("#/")) value = value.slice(1);
    if (value.startsWith("#")) return;
    if (!value.startsWith("/")) value = "/" + value;
    if (value === "/home") value = "/";
    if (replace) history.replaceState(null, "", value);
    else history.pushState(null, "", value);
    void navigate();
  }

  function setSeo(title, description, product, indexable) {
    document.title = title + " | EMDAD";
    const descriptionMeta = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (descriptionMeta) descriptionMeta.content = description;
    if (ogTitle) ogTitle.content = document.title;
    if (ogDescription) ogDescription.content = description;
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = location.origin + location.pathname + location.search;
    const robots = document.querySelector('meta[name="robots"]');
    if (robots) robots.content = indexable === false ? "noindex,nofollow" : "index,follow,max-image-preview:large";
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.content = locale === "ar" ? "ar_EG" : "en_US";
    const schema = document.getElementById("structured-data");
    const base = {
      "@context": "https://schema.org",
      "@type": product ? "Product" : "Organization",
      "name": product ? (locale === "ar" ? product.name_ar : product.name_en) : t("brand"),
      "description": description,
      ...(product ? {
        "sku": product.sku || undefined,
        "brand": product.brand ? { "@type": "Brand", "name": product.brand } : undefined,
        "offers": {
          "@type": "Offer", "priceCurrency": "EGP", "price": String(product.unit_price),
          "availability": Number(product.stock_qty) > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          "seller": { "@type": "Organization", "name": product.store_name || t("brand") }
        },
        ...(currentProductImages[0] ? { "image": publicImageUrl(currentProductImages[0].storage_path) } : {})
      } : {})
    };
    schema.textContent = JSON.stringify(base);
  }

  function applyLocale() {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      if (translations[locale][key]) element.textContent = t(key);
    });
    document.getElementById("language-button").textContent = t("language");
    document.getElementById("auth-submit").textContent = registering ? t("auth_sign_up") : t("auth_sign_in");
    document.getElementById("auth-switch").textContent = registering ? t("auth_switch_signin") : t("auth_switch_signup");
    document.getElementById("category-empty").textContent = t("categories_empty");
    document.getElementById("shop-empty").textContent = t("empty_products");
    if (categories.length) renderCategories(categories);
    if (currentProduct) renderProductDetail(currentProduct, currentProductImages);
    setSeo(locale === "ar" ? "مستلزمات أعمالك من موردين موثوقين" : "Business supplies from trusted suppliers",
      t("hero_body"));
    try { localStorage.setItem("emdad-locale", locale); }
    catch (error) { console.warn("Could not save the language preference.", error); }
  }

  function normalizeArabic(value) {
    return String(value || "").toLowerCase()
      .replace(/[أإآٱ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه")
      .replace(/[\u064B-\u065F\u0670ـ]/g, "").trim();
  }

  function renderCategories(rows) {
    const roots = rows.filter((category) => !category.parent_id);
    document.getElementById("category-grid").innerHTML = roots.map((category, index) => {
      const name = locale === "ar" ? category.name_ar : category.name_en;
      return '<a class="category-card" href="/shop?category=' + encodeURIComponent(category.id)
        + '"><span class="category-index">' + String(index + 1).padStart(2, "0")
        + '</span><h3>' + escapeHtml(name) + '</h3><span class="category-arrow" aria-hidden="true">↗</span></a>';
    }).join("");
    const select = document.getElementById("shop-category");
    const selected = select.value;
    select.innerHTML = '<option value="">' + escapeHtml(t("all_categories")) + "</option>"
      + roots.map((category) => '<option value="' + category.id + '">' + escapeHtml(locale === "ar" ? category.name_ar : category.name_en) + "</option>").join("")
      + rows.filter((category) => category.parent_id).map((category) => '<option value="' + category.id + '">　' + escapeHtml(locale === "ar" ? category.name_ar : category.name_en) + "</option>").join("");
    if (selected) select.value = selected;
    document.getElementById("category-loading").hidden = true;
    document.getElementById("category-empty").hidden = roots.length !== 0;
  }

  async function loadCategories() {
    if (!configured) {
      document.getElementById("category-loading").hidden = true;
      document.getElementById("category-empty").hidden = false;
      showMessage(document.getElementById("config-notice"), t("config_missing"));
      return;
    }
    try {
      categories = await api(endpoint("/rest/v1/categories", {
        select: "id,parent_id,name_ar,name_en,sort_order", is_active: "eq.true", order: "sort_order"
      })) || [];
      renderCategories(categories);
      fillProductCategories();
    } catch (error) {
      console.error("Could not load categories.", error);
      document.getElementById("category-loading").hidden = true;
      showMessage(document.getElementById("category-error"), t("error_loading"));
    }
  }

  function fillProductCategories() {
    const select = document.getElementById("product-category");
    select.innerHTML = categories.map((category) => '<option value="' + category.id + '">'
      + escapeHtml(locale === "ar" ? category.name_ar : category.name_en) + "</option>").join("");
  }

  function productCard(product) {
    const image = product.image_url
      ? '<img src="' + escapeHtml(product.image_url) + '" alt="' + escapeHtml(locale === "ar" ? product.name_ar : product.name_en) + '" loading="lazy">'
      : '<div class="product-placeholder" aria-hidden="true">إمداد</div>';
    const name = locale === "ar" ? product.name_ar : product.name_en;
    const out = Number(product.stock_qty) <= 0;
    return '<article class="product-card"><a class="product-image" href="/product/' + product.id + '">'
      + image + (out ? '<span class="product-tag">' + escapeHtml(t("out_of_stock")) + "</span>" : "")
      + '</a><div class="product-card-body"><span class="product-vendor">' + escapeHtml(product.store_name || t("brand"))
      + '</span><h2><a href="/product/' + product.id + '">' + escapeHtml(name) + '</a></h2><p class="product-price">'
      + escapeHtml(formatPrice(product.unit_price)) + '<small> / ' + escapeHtml(product.unit) + '</small></p><p class="product-card-meta">'
      + escapeHtml(t("min_qty")) + ": " + escapeHtml(product.min_order_qty) + " · "
      + escapeHtml(product.city || "") + '</p><a class="text-link" href="/product/' + product.id + '">'
      + escapeHtml(t("description")) + ' <span aria-hidden="true">↗</span></a></div></article>';
  }

  async function searchCatalog(reset) {
    if (reset) {
      catalogOffset = 0;
      document.getElementById("product-grid").innerHTML = "";
    }
    const loading = document.getElementById("shop-loading");
    loading.hidden = false;
    showMessage(document.getElementById("shop-error"), "");
    document.getElementById("shop-empty").hidden = true;
    try {
      const categoryId = document.getElementById("shop-category").value || null;
      const rows = await api("/rest/v1/rpc/search_products", {
        method: "POST",
        body: {
          p_query: normalizeArabic(document.getElementById("shop-query").value),
          p_category_id: categoryId,
          p_sort: document.getElementById("shop-sort").value,
          p_limit: catalogPageSize,
          p_offset: catalogOffset
        }
      }) || [];
      const imageMap = await loadProductImageMap(rows);
      rows.forEach((product) => { product.image_url = imageMap[product.id] || ""; });
      document.getElementById("product-grid").insertAdjacentHTML("beforeend", rows.map(productCard).join(""));
      catalogHasMore = rows.length === catalogPageSize;
      catalogOffset += rows.length;
      document.getElementById("shop-more").hidden = !catalogHasMore;
      document.getElementById("shop-empty").hidden = catalogOffset !== 0;
      if (!rows.length && catalogOffset === 0) document.getElementById("shop-empty").hidden = false;
    } catch (error) {
      console.error("Product search failed.", error);
      showMessage(document.getElementById("shop-error"), t("error_loading"));
    } finally {
      loading.hidden = true;
    }
  }

  async function loadProductImageMap(products) {
    if (!products.length) return {};
    const ids = products.map((product) => product.id);
    const query = endpoint("/rest/v1/product_images", {
      select: "product_id,storage_path,sort_order",
      product_id: "in.(" + ids.join(",") + ")",
      order: "sort_order"
    });
    const rows = await api(query);
    const result = {};
    (rows || []).forEach((row) => {
      if (!result[row.product_id]) result[row.product_id] = publicImageUrl(row.storage_path);
    });
    return result;
  }

  function publicImageUrl(path) {
    return supabaseUrl + "/storage/v1/object/public/product-images/" + path.split("/").map(encodeURIComponent).join("/");
  }

  function renderProductDetail(product, images) {
    const name = locale === "ar" ? product.name_ar : product.name_en;
    const description = locale === "ar" ? product.description_ar : product.description_en;
    const gallery = images.length
      ? images.map((image, index) => '<img class="detail-image" src="' + escapeHtml(publicImageUrl(image.storage_path))
        + '" alt="' + escapeHtml((locale === "ar" ? image.alt_ar : image.alt_en) || name) + '" ' + (index ? 'loading="lazy"' : 'fetchpriority="high"') + '>').join("")
      : '<div class="detail-image product-placeholder">إمداد</div>';
    const spec = Object.entries(product.specifications || {}).map(([key, value]) => "<tr><th>"
      + escapeHtml(key) + "</th><td>" + escapeHtml(value) + "</td></tr>").join("");
    const tiers = (product.product_price_tiers || []).sort((a, b) => a.min_qty - b.min_qty)
      .map((tier) => "<tr><td>≥ " + escapeHtml(tier.min_qty) + "</td><td>" + escapeHtml(formatPrice(tier.unit_price)) + "</td></tr>").join("");
    const disabled = Number(product.stock_qty) <= 0;
    document.getElementById("product-detail").innerHTML =
      '<div class="product-detail-layout"><div class="product-gallery">' + gallery
      + '</div><div class="product-detail-info"><span class="eyebrow">' + escapeHtml(product.store_name || t("brand"))
      + '</span><h1>' + escapeHtml(name) + '</h1><p class="detail-price">' + escapeHtml(formatPrice(product.unit_price))
      + ' <small>/ ' + escapeHtml(product.unit) + '</small></p><p>' + escapeHtml(t("available")) + ': '
      + escapeHtml(product.stock_qty) + ' ' + escapeHtml(product.unit) + '</p><p>' + escapeHtml(t("min_qty"))
      + ': ' + escapeHtml(product.min_order_qty) + '</p><p>' + escapeHtml(t("shipping")) + ': '
      + escapeHtml(formatPrice(product.shipping_fee)) + ' · ' + escapeHtml(t("vat")) + ' '
      + escapeHtml(product.vat_rate) + '% (' + escapeHtml(t("vat_goods_only")) + ')</p><p>'
      + escapeHtml(t("sold_by")) + ': ' + escapeHtml(product.store_name || t("brand")) + (product.store_city ? " · " + escapeHtml(product.store_city) : "")
      + '</p><label class="quantity-control"><span>' + escapeHtml(t("quantity")) + '</span><input id="detail-quantity" type="number" min="'
      + escapeHtml(product.min_order_qty) + '" max="' + escapeHtml(product.stock_qty) + '" value="'
      + escapeHtml(product.min_order_qty) + '" step="1" ' + (disabled ? "disabled" : "") + '></label>'
      + '<div id="detail-estimate" class="estimate-box"></div><button id="detail-add-cart" class="button primary full-width" type="button" '
      + (disabled ? "disabled" : "") + '>' + escapeHtml(t("add_to_cart")) + '</button><a class="button secondary-dark full-width quote-button" href="/requests?product='
      + product.id + '">' + escapeHtml(t("request_quote")) + '</a><p class="estimate-disclaimer">'
      + escapeHtml(t("cart_estimate_note")) + '</p></div></div><div class="detail-description"><h2>'
      + escapeHtml(t("description")) + '</h2><p>' + escapeHtml(description || "") + '</p>'
      + (spec ? '<h2>' + escapeHtml(t("specifications")) + '</h2><table class="data-table"><tbody>' + spec + '</tbody></table>' : "")
      + (tiers ? '<h2>' + escapeHtml(t("price_tiers")) + '</h2><table class="data-table"><tbody>' + tiers + '</tbody></table>' : "")
      + '</div>';
    updateProductEstimate(product);
    const quantity = document.getElementById("detail-quantity");
    quantity.addEventListener("input", () => updateProductEstimate(product));
    document.getElementById("detail-add-cart").addEventListener("click", () => {
      const requested = Number(quantity.value);
      if (!Number.isInteger(requested) || requested < Number(product.min_order_qty) || requested > Number(product.stock_qty)) {
        quantity.reportValidity();
        return;
      }
      addToCart(product.id, requested);
      showMessage(document.getElementById("global-message"), t("add_to_cart") + " · " + escapeHtml(name));
      navigateTo("/cart");
    });
  }

  function updateProductEstimate(product) {
    const field = document.getElementById("detail-quantity");
    const target = document.getElementById("detail-estimate");
    if (!field || !target) return;
    const quantity = Math.max(0, Number(field.value) || 0);
    const tier = (product.product_price_tiers || []).filter((row) => Number(row.min_qty) <= quantity)
      .sort((a, b) => Number(b.min_qty) - Number(a.min_qty))[0];
    const price = tier ? Number(tier.unit_price) : Number(product.unit_price);
    const subtotal = Math.round(price * quantity * 100) / 100;
    const vat = Math.round(subtotal * Number(product.vat_rate) / 100 * 100) / 100;
    target.innerHTML = '<span>' + escapeHtml(t("estimated_total")) + '</span><strong>'
      + escapeHtml(formatPrice(subtotal + vat + Number(product.shipping_fee))) + '</strong>';
  }

  async function loadProduct(id) {
    document.getElementById("product-loading").hidden = false;
    showMessage(document.getElementById("product-error"), "");
    try {
      const query = endpoint("/rest/v1/product_public", { select: "*", id: "eq." + id, limit: "1" });
      const products = await api(query);
      if (!products || !products.length) throw new Error("PRODUCT_UNAVAILABLE");
      const product = products[0];
      const [images, tiers] = await Promise.all([
        api(endpoint("/rest/v1/product_images", { select: "storage_path,alt_ar,alt_en,sort_order", product_id: "eq." + id, order: "sort_order" })),
        api(endpoint("/rest/v1/product_price_tiers", { select: "min_qty,unit_price", product_id: "eq." + id, order: "min_qty" }))
      ]);
      product.product_price_tiers = tiers || [];
      currentProduct = product;
      currentProductImages = images || [];
      const name = locale === "ar" ? product.name_ar : product.name_en;
      setSeo(name, String(locale === "ar" ? product.description_ar : product.description_en).slice(0, 155), product);
      renderProductDetail(product, images || []);
    } catch (error) {
      console.error("Could not load product details.", error);
      showMessage(document.getElementById("product-error"), t("error_loading"));
    } finally {
      document.getElementById("product-loading").hidden = true;
    }
  }

  function addToCart(id, quantity) {
    const line = cart.find((entry) => entry.id === id);
    if (line) line.quantity += quantity;
    else cart.push({ id, quantity });
    saveCart();
  }

  async function loadCart() {
    const container = document.getElementById("cart-lines");
    const empty = document.getElementById("cart-empty");
    const checkout = document.getElementById("checkout-panel");
    container.innerHTML = "";
    if (!cart.length) {
      empty.hidden = false;
      checkout.hidden = true;
      return;
    }
    empty.hidden = true;
    try {
      const ids = cart.map((line) => line.id);
      const products = await api(endpoint("/rest/v1/product_public", {
        select: "id,name_ar,name_en,unit,unit_price,min_order_qty,stock_qty,shipping_fee,vat_rate,store_name",
        id: "in.(" + ids.join(",") + ")"
      }));
      const map = new Map((products || []).map((product) => [product.id, product]));
      cart = cart.filter((line) => map.has(line.id));
      saveCart();
      const details = cart.map((line) => ({ ...line, product: map.get(line.id) }));
      const warning = document.getElementById("checkout-auth-warning");
      if (!session) {
        warning.innerHTML = escapeHtml(t("checkout_requires_login")) + ' <a href="/auth">' + escapeHtml(t("nav_sign_in")) + "</a>";
        warning.hidden = false;
        document.getElementById("checkout-submit").disabled = true;
      } else {
        warning.hidden = true;
        document.getElementById("checkout-submit").disabled = false;
      }
      const totals = details.reduce((sum, line) => {
        const price = Number(line.product.unit_price);
        const subtotal = price * line.quantity;
        sum.subtotal += subtotal;
        sum.vat += subtotal * Number(line.product.vat_rate) / 100;
        sum.shipping += Number(line.product.shipping_fee);
        return sum;
      }, { subtotal: 0, vat: 0, shipping: 0 });
      container.innerHTML = details.map((line) => {
        const product = line.product;
        return '<article class="cart-line"><div class="cart-line-info"><a href="/product/' + product.id + '"><strong>'
          + escapeHtml(locale === "ar" ? product.name_ar : product.name_en) + '</strong></a><span>'
          + escapeHtml(product.store_name) + '</span><small>' + escapeHtml(formatPrice(product.unit_price))
          + " / " + escapeHtml(product.unit) + '</small></div><label><span>' + escapeHtml(t("quantity"))
          + '</span><input data-cart-quantity="' + product.id + '" type="number" min="'
          + escapeHtml(product.min_order_qty) + '" max="' + escapeHtml(product.stock_qty)
          + '" step="1" value="' + line.quantity + '"></label><strong>'
          + escapeHtml(formatPrice(Number(product.unit_price) * line.quantity)) + '</strong><button class="link-button remove-button" data-remove-cart="'
          + product.id + '" type="button">' + escapeHtml(t("remove")) + '</button></article>';
      }).join("");
      document.getElementById("cart-total").innerHTML =
        '<p><span>' + escapeHtml(t("estimated_subtotal")) + '</span><strong>' + escapeHtml(formatPrice(totals.subtotal)) + '</strong></p>'
        + '<p><span>' + escapeHtml(t("estimated_vat")) + '</span><strong>' + escapeHtml(formatPrice(totals.vat)) + '</strong></p>'
        + '<p><span>' + escapeHtml(t("estimated_shipping")) + '</span><strong>' + escapeHtml(formatPrice(totals.shipping)) + '</strong></p>'
        + '<p class="total-row"><span>' + escapeHtml(t("estimated_total")) + '</span><strong>'
        + escapeHtml(formatPrice(totals.subtotal + totals.vat + totals.shipping)) + '</strong></p>';
      checkout.hidden = false;
      container.querySelectorAll("[data-cart-quantity]").forEach((input) => input.addEventListener("change", () => {
        const next = Number(input.value);
        const item = cart.find((line) => line.id === input.dataset.cartQuantity);
        if (!item || !Number.isInteger(next) || next < Number(input.min) || next > Number(input.max)) {
          input.reportValidity();
          return;
        }
        item.quantity = next;
        saveCart();
        void loadCart();
      }));
      container.querySelectorAll("[data-remove-cart]").forEach((button) => button.addEventListener("click", () => {
        cart = cart.filter((line) => line.id !== button.dataset.removeCart);
        saveCart();
        void loadCart();
      }));
    } catch (error) {
      console.error("Could not load cart products.", error);
      showMessage(document.getElementById("checkout-error"), t("error_loading"));
    }
  }

  async function loadProfile() {
    if (!session) { userProfile = null; staffRole = "buyer"; updateNavigation(); return null; }
    const rows = await api(endpoint("/rest/v1/profiles", {
      select: "id,full_name,role", id: "eq." + session.user.id, limit: "1"
    }));
    userProfile = rows && rows[0] || null;
    staffRole = userProfile ? userProfile.role : "buyer";
    updateNavigation();
    return userProfile;
  }

  async function loadCompanies() {
    const memberships = await api(endpoint("/rest/v1/company_members", {
      select: "member_role,companies(id,name,city,verification_status)",
      user_id: "eq." + session.user.id
    }));
    return (memberships || []).filter((membership) => membership.companies).map((membership) => ({
      ...membership.companies, member_role: membership.member_role
    }));
  }

  const statusLabels = {
    pending: "verification_pending", verified: "verification_verified", rejected: "verification_rejected",
    under_review: "verification_under_review", suspended: "verification_suspended"
  };
  const orderLabels = {
    new: "order_status_new", confirmed: "order_status_confirmed", shipped: "order_status_shipped",
    delivered: "order_status_delivered", cancelled: "order_status_cancelled"
  };

  async function loadDashboard() {
    const loading = document.getElementById("dashboard-loading");
    loading.hidden = false;
    document.getElementById("company-list").innerHTML = "";
    document.getElementById("company-empty").hidden = true;
    showMessage(document.getElementById("dashboard-error"), "");
    try {
      const [companies, orders] = await Promise.all([
        loadCompanies(),
        api(endpoint("/rest/v1/orders", {
          select: "id,order_number,status,grand_total,created_at", order: "created_at.desc", limit: "20"
        }))
      ]);
      loading.hidden = true;
      document.getElementById("company-list").innerHTML = companies.map((company) =>
        '<article class="company-card"><div><h2>' + escapeHtml(company.name) + '</h2><p>'
        + escapeHtml(company.city) + '</p></div><span class="status status-' + escapeHtml(company.verification_status)
        + '">' + escapeHtml(t(statusLabels[company.verification_status] || "verification_pending")) + "</span></article>"
      ).join("");
      document.getElementById("company-empty").hidden = companies.length !== 0;
      renderBuyerOrders(orders || []);
    } catch (error) {
      console.error("Could not load buyer portal.", error);
      loading.hidden = true;
      showMessage(document.getElementById("dashboard-error"), t("error_loading"));
    }
  }

  function renderBuyerOrders(orders) {
    const container = document.getElementById("buyer-orders");
    if (!orders.length) {
      container.innerHTML = '<p class="muted">' + escapeHtml(t("buyer_orders_empty")) + "</p>";
      return;
    }
    container.innerHTML = orders.map((order) => '<article class="order-card"><div><strong>'
      + escapeHtml(t("order_number")) + " #" + escapeHtml(order.order_number) + '</strong><span class="status">'
      + escapeHtml(t(orderLabels[order.status] || "order_status_new")) + '</span></div><strong>'
      + escapeHtml(formatPrice(order.grand_total)) + '</strong>'
      + (order.status === "new" ? '<button class="button secondary-dark" data-cancel-order="' + order.id + '" type="button">'
        + escapeHtml(t("cancel_order")) + "</button>" : "") + "</article>").join("");
    container.querySelectorAll("[data-cancel-order]").forEach((button) => button.addEventListener("click", async () => {
      button.disabled = true;
      try {
        await api("/rest/v1/rpc/cancel_buyer_order", { method: "POST", body: { p_order_id: button.dataset.cancelOrder } });
        await loadDashboard();
      } catch (error) {
        console.error("Could not cancel order.", error);
        button.disabled = false;
        showMessage(document.getElementById("dashboard-error"), mapError(error, t("request_failed")));
      }
    }));
  }

  async function loadSellerCenter() {
    const errorBox = document.getElementById("seller-error");
    showMessage(errorBox, "");
    try {
      const [companies, sellers] = await Promise.all([
        loadCompanies(),
        api("/rest/v1/rpc/get_my_sellers", { method: "POST", body: {} })
      ]);
      sellerStores = sellers || [];
      const verified = companies.filter((company) => company.verification_status === "verified" && company.member_role === "owner");
      document.getElementById("seller-company").innerHTML = verified.map((company) => '<option value="'
        + company.id + '">' + escapeHtml(company.name) + "</option>").join("");
      document.getElementById("seller-apply-panel").hidden = sellerStores.length > 0 || !verified.length;
      document.getElementById("seller-workspace").hidden = sellerStores.length === 0;
      if (!verified.length && !sellerStores.length) showMessage(errorBox, t("seller_apply_error"));
      if (sellerStores.length) {
        selectedSellerId = sellerStores[0].id;
        if (sellerStores[0].status !== "verified") showMessage(errorBox, t("seller_pending"));
        await loadSellerProducts();
        await loadSellerOrders();
      }
    } catch (error) {
      console.error("Could not load seller center.", error);
      showMessage(errorBox, t("error_loading"));
    }
  }

  async function loadSellerProducts() {
    const container = document.getElementById("seller-products");
    try {
      const products = await api(endpoint("/rest/v1/products", {
        select: "id,category_id,name_ar,name_en,unit,unit_price,min_order_qty,stock_qty,is_active,review_status",
        seller_id: "eq." + selectedSellerId, order: "created_at.desc", limit: "100"
      }));
      container.innerHTML = (products || []).map((product) => '<article class="seller-product-row"><div><h3>'
        + escapeHtml(locale === "ar" ? product.name_ar : product.name_en) + '</h3><p>'
        + escapeHtml(formatPrice(product.unit_price)) + " / " + escapeHtml(product.unit)
        + " · " + escapeHtml(t("product_stock")) + ": " + escapeHtml(product.stock_qty) + '</p></div><span class="status">'
        + escapeHtml(t("review_" + product.review_status)) + '</span><button class="button secondary-dark" data-edit-product="'
        + product.id + '" type="button">' + escapeHtml(t("edit")) + "</button></article>").join("")
        || '<p class="muted">' + escapeHtml(t("categories_empty")) + "</p>";
      container.querySelectorAll("[data-edit-product]").forEach((button) => button.addEventListener("click", () => {
        void editProduct(button.dataset.editProduct);
      }));
    } catch (error) {
      console.error("Could not load seller products.", error);
      showMessage(document.getElementById("seller-error"), t("error_loading"));
    }
  }

  function parseLines(value, separator) {
    return value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean).map((line) => line.split(separator).map((part) => part.trim()));
  }

  async function editProduct(id) {
    try {
      const rows = await api(endpoint("/rest/v1/products", {
        select: "id,category_id,name_ar,name_en,description_ar,description_en,specifications,brand,sku,unit,unit_price,min_order_qty,stock_qty,shipping_fee,vat_rate,is_active",
        id: "eq." + id, limit: "1"
      }));
      const product = rows && rows[0];
      if (!product) throw new Error("PRODUCT_NOT_FOUND");
      const tiers = await api(endpoint("/rest/v1/product_price_tiers", {
        select: "min_qty,unit_price", product_id: "eq." + id, order: "min_qty"
      }));
      document.getElementById("edit-product-id").value = id;
      document.getElementById("product-category").value = product.category_id;
      document.getElementById("product-name-ar").value = product.name_ar;
      document.getElementById("product-name-en").value = product.name_en;
      document.getElementById("product-brand").value = product.brand || "";
      document.getElementById("product-sku").value = product.sku || "";
      document.getElementById("product-unit").value = product.unit;
      document.getElementById("product-price").value = product.unit_price;
      document.getElementById("product-min-qty").value = product.min_order_qty;
      document.getElementById("product-stock").value = product.stock_qty;
      document.getElementById("product-shipping").value = product.shipping_fee;
      document.getElementById("product-vat").value = product.vat_rate;
      document.getElementById("product-description-ar").value = product.description_ar || "";
      document.getElementById("product-description-en").value = product.description_en || "";
      document.getElementById("product-specs").value = Object.entries(product.specifications || {}).map(([key, value]) => key + ": " + value).join("\n");
      document.getElementById("product-tiers").value = (tiers || []).map((tier) => tier.min_qty + ", " + tier.unit_price).join("\n");
      document.getElementById("product-form").hidden = false;
      document.getElementById("product-form").scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (error) {
      console.error("Could not load product for editing.", error);
      showMessage(document.getElementById("product-save-error"), t("save_product_error"));
    }
  }

  async function uploadProductImages(productId, files) {
    if (!files.length) return;
    if (files.length > 8) throw new Error("PRODUCT_IMAGE_LIMIT");
    const present = await api(endpoint("/rest/v1/product_images", {
      select: "id,sort_order", product_id: "eq." + productId
    }));
    if (present.length + files.length > 8) throw new Error("PRODUCT_IMAGE_LIMIT");
    let nextOrder = Math.max(-1, ...present.map((image) => Number(image.sort_order))) + 1;
    for (const file of files) {
      if (!["image/png", "image/jpeg", "image/webp"].includes(file.type) || file.size > 5242880) {
        throw new Error("INVALID_PRODUCT_IMAGE");
      }
      const extension = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
      const path = selectedSellerId + "/" + productId + "/" + crypto.randomUUID() + "." + extension;
      const response = await fetch(supabaseUrl + "/storage/v1/object/product-images/" + path.split("/").map(encodeURIComponent).join("/"), {
        method: "POST",
        headers: {
          apikey: anonKey,
          Authorization: "Bearer " + session.access_token,
          "Content-Type": file.type,
          "x-upsert": "false"
        },
        body: file
      });
      if (!response.ok) throw new Error("IMAGE_UPLOAD_FAILED");
      await api("/rest/v1/product_images", {
        method: "POST",
        headers: { Prefer: "return=minimal" },
        body: { product_id: productId, storage_path: path, alt_ar: file.name, alt_en: file.name, sort_order: nextOrder++ }
      });
    }
  }

  async function loadSellerOrders() {
    const container = document.getElementById("seller-orders");
    try {
      const orders = await api(endpoint("/rest/v1/seller_orders", {
        select: "id,order_id,status,grand_total,created_at,payment_collected,orders(order_number,delivery_name,delivery_phone,delivery_city,delivery_address)",
        seller_id: "eq." + selectedSellerId, order: "created_at.desc", limit: "100"
      }));
      if (!orders.length) {
        container.innerHTML = '<p class="muted">' + escapeHtml(t("seller_orders_empty")) + "</p>";
        return;
      }
      container.innerHTML = orders.map((order) => {
        const parent = order.orders || {};
        let next = null;
        if (order.status === "new") next = ["confirmed", "confirm_order"];
        else if (order.status === "confirmed") next = ["shipped", "ship_order"];
        else if (order.status === "shipped") next = ["delivered", "deliver_order"];
        return '<article class="order-card seller-order"><div><strong>' + escapeHtml(t("order_number")) + " #"
          + escapeHtml(parent.order_number || order.order_id.slice(0, 8)) + '</strong><span class="status">'
          + escapeHtml(t(orderLabels[order.status] || "order_status_new")) + '</span><p>'
          + escapeHtml(parent.delivery_name || "") + " · " + escapeHtml(parent.delivery_phone || "") + "<br>"
          + escapeHtml(parent.delivery_city || "") + " · " + escapeHtml(parent.delivery_address || "") + '</p></div><div>'
          + '<strong>' + escapeHtml(formatPrice(order.grand_total)) + '</strong><p>'
          + escapeHtml(t("commission_due")) + '</p></div>'
          + (next ? '<button class="button primary" data-transition-order="' + order.id + '" data-next-status="' + next[0]
            + '" type="button">' + escapeHtml(t(next[1])) + "</button>" : "") + "</article>";
      }).join("");
      container.querySelectorAll("[data-transition-order]").forEach((button) => button.addEventListener("click", async () => {
        button.disabled = true;
        try {
          await api("/rest/v1/rpc/transition_seller_order", {
            method: "POST",
            body: { p_seller_order_id: button.dataset.transitionOrder, p_next: button.dataset.nextStatus, p_note: null }
          });
          await loadSellerOrders();
        } catch (error) {
          console.error("Could not update seller order.", error);
          button.disabled = false;
          showMessage(document.getElementById("seller-error"), mapError(error, t("request_failed")));
        }
      }));
    } catch (error) {
      console.error("Could not load seller orders.", error);
      showMessage(document.getElementById("seller-error"), t("error_loading"));
    }
  }

  function addRequestItem(initial) {
    const container = document.getElementById("request-items");
    const row = document.createElement("div");
    row.className = "request-item-row";
    row.dataset.productId = initial && initial.id || "";
    row.innerHTML = '<label class="span-two"><span>' + escapeHtml(t("request_item_placeholder"))
      + '</span><textarea class="request-item-specs" minlength="3" maxlength="3000" required></textarea></label>'
      + '<label><span>' + escapeHtml(t("request_quantity_placeholder"))
      + '</span><input class="request-item-quantity" type="number" min="0.001" step="0.001"></label>'
      + '<label><span>' + escapeHtml(t("request_unit_placeholder"))
      + '</span><input class="request-item-unit" maxlength="40"></label>'
      + '<button class="link-button remove-button request-item-remove" type="button">' + escapeHtml(t("remove")) + "</button>";
    if (initial) {
      row.querySelector(".request-item-specs").value = (locale === "ar" ? initial.name_ar : initial.name_en) + " — ";
    }
    row.querySelector(".request-item-remove").addEventListener("click", () => {
      if (container.children.length > 1) row.remove();
    });
    container.append(row);
  }

  async function uploadRequestAttachments(requestId, files) {
    if (files.length > 10) throw new Error("ATTACHMENT_LIMIT");
    for (const file of files) {
      if (!["application/pdf", "image/png", "image/jpeg", "image/webp"].includes(file.type) || file.size > 26214400) {
        throw new Error("INVALID_ATTACHMENT");
      }
      const safeName = file.name.replace(/[^A-Za-z0-9._-]/g, "_").slice(0, 120);
      const path = session.user.id + "/" + requestId + "/" + crypto.randomUUID() + "-" + safeName;
      const response = await fetch(supabaseUrl + "/storage/v1/object/request-attachments/" + path.split("/").map(encodeURIComponent).join("/"), {
        method: "POST",
        headers: {
          apikey: anonKey, Authorization: "Bearer " + session.access_token,
          "Content-Type": file.type, "x-upsert": "false"
        },
        body: file
      });
      if (!response.ok) throw new Error("ATTACHMENT_UPLOAD_FAILED");
      await api("/rest/v1/rpc/add_request_attachment", {
        method: "POST",
        body: {
          p_request_id: requestId, p_storage_path: path, p_file_name: file.name,
          p_mime_type: file.type, p_file_size: file.size
        }
      });
    }
  }

  async function loadRequests() {
    const container = document.getElementById("request-list");
    try {
      const rows = await api(endpoint("/rest/v1/procurement_requests", {
        select: "id,tracking_number,title,status,created_at", order: "created_at.desc", limit: "50"
      }));
      container.innerHTML = (rows || []).map((row) => '<article class="request-card"><div><strong>'
        + escapeHtml(row.title) + '</strong><span class="request-tracking">' + escapeHtml(t("request_tracking"))
        + ": " + escapeHtml(row.tracking_number) + '</span></div><span class="status">'
        + escapeHtml(t("request_status_" + row.status) || row.status) + "</span></article>").join("")
        || '<p class="muted">' + escapeHtml(t("operations_empty")) + "</p>";
      container.querySelectorAll(".request-card").forEach((card, index) => {
        const row = rows[index];
        const attachmentsLink = document.createElement("button");
        attachmentsLink.className = "link-button";
        attachmentsLink.type = "button";
        attachmentsLink.textContent = locale === "ar" ? "عرض المرفقات" : "View attachments";
        attachmentsLink.addEventListener("click", () => { void viewRequestAttachments(row.id); });
        card.append(attachmentsLink);
      });
    } catch (error) {
      console.error("Could not load buyer requests.", error);
      showMessage(document.getElementById("request-error"), t("error_loading"));
    }
  }

  async function viewRequestAttachments(requestId) {
    try {
      const files = await api(endpoint("/rest/v1/request_attachments", {
        select: "storage_path,file_name", request_id: "eq." + requestId
      }));
      if (!files.length) {
        showMessage(document.getElementById("request-success"), locale === "ar" ? "لا توجد مرفقات." : "No attachments.");
        return;
      }
      const signed = await api("/storage/v1/object/sign/request-attachments/" + files[0].storage_path.split("/").map(encodeURIComponent).join("/"), {
        method: "POST", body: { expiresIn: 300 }
      });
      const path = signed.signedURL || signed.signedUrl;
      const link = document.createElement("a");
      link.href = path.startsWith("http") ? path : supabaseUrl + "/storage/v1" + path;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = files[0].file_name;
      link.className = "button secondary-dark";
      document.getElementById("request-list").append(link);
    } catch (error) {
      console.error("Could not create attachment download link.", error);
      showMessage(document.getElementById("request-error"), t("request_failed"));
    }
  }

  async function loadOperations(tab) {
    if (!staffRole || staffRole === "buyer") {
      navigateTo("/dashboard");
      return;
    }
    const roleAccess = {
      requests: ["super_admin", "procurement_manager", "procurement_employee"],
      products: ["super_admin", "procurement_manager", "procurement_employee", "quality_manager"],
      sellers: ["super_admin", "procurement_manager", "quality_manager", "finance_manager"],
      companies: ["super_admin", "operations_manager", "quality_manager"],
      categories: ["super_admin", "procurement_manager"],
      users: ["super_admin"],
      finance: ["super_admin", "finance_manager"]
    };
    if (!roleAccess[tab] || !roleAccess[tab].includes(staffRole)) {
      showMessage(document.getElementById("operations-error"), t("request_failed"));
      return;
    }
    const container = document.getElementById("operations-content");
    container.innerHTML = '<p>' + escapeHtml(t("loading")) + "</p>";
    showMessage(document.getElementById("operations-error"), "");
    try {
      if (tab === "requests") {
        const [requests, internals] = await Promise.all([
          api(endpoint("/rest/v1/procurement_requests", { select: "id,tracking_number,title,description,status,created_at", order: "created_at.desc", limit: "100" })),
          api(endpoint("/rest/v1/request_internal", { select: "request_id,assigned_to,is_urgent,internal_notes" }))
        ]);
        const notes = new Map((internals || []).map((row) => [row.request_id, row]));
        container.innerHTML = (requests || []).map((request) => {
          const internal = notes.get(request.id) || {};
          return '<article class="operations-card"><div class="panel-heading"><div><h2>' + escapeHtml(request.title)
            + '</h2><span class="request-tracking">' + escapeHtml(request.tracking_number) + '</span></div><label class="urgent-control">'
            + '<input data-urgent="' + request.id + '" type="checkbox" ' + (internal.is_urgent ? "checked" : "") + '>'
            + escapeHtml(t("urgent")) + '</label></div><p>' + escapeHtml(request.description) + '</p><p class="muted">'
            + escapeHtml(t("request_status_" + request.status)) + '</p><label>' + escapeHtml(t("internal_notes"))
            + '<textarea data-internal-notes="' + request.id + '">' + escapeHtml(internal.internal_notes || "") + '</textarea></label>'
            + '<label>' + escapeHtml(t("customer_note")) + '<input data-customer-note="' + request.id + '"></label>'
            + '<div class="hero-actions"><select data-request-status="' + request.id + '">'
            + ["submitted", "under_review", "clarification_needed", "sourcing", "quoted", "accepted", "declined", "cancelled", "closed"]
              .map((status) => '<option value="' + status + '" ' + (status === request.status ? "selected" : "") + '>'
                + escapeHtml(t("request_status_" + status)) + "</option>").join("")
            + '</select><button class="button primary" data-manage-request="' + request.id + '" type="button">'
            + escapeHtml(t("update_request")) + "</button></div></article>";
        }).join("") || '<p class="empty-state">' + escapeHtml(t("operations_empty")) + "</p>";
        container.querySelectorAll("[data-manage-request]").forEach((button) => button.addEventListener("click", async () => {
          const id = button.dataset.manageRequest;
          button.disabled = true;
          try {
            await api("/rest/v1/rpc/manage_request", {
              method: "POST",
              body: {
                p_request_id: id,
                p_status: container.querySelector('[data-request-status="' + id + '"]').value,
                p_assigned_to: staffRole === "procurement_manager" || staffRole === "super_admin" ? session.user.id : null,
                p_is_urgent: container.querySelector('[data-urgent="' + id + '"]').checked,
                p_customer_note: container.querySelector('[data-customer-note="' + id + '"]').value,
                p_internal_notes: container.querySelector('[data-internal-notes="' + id + '"]').value
              }
            });
            await loadOperations("requests");
          } catch (error) {
            console.error("Could not update request.", error);
            button.disabled = false;
            showMessage(document.getElementById("operations-error"), mapError(error, t("request_failed")));
          }
        }));
      } else if (tab === "products") {
        const rows = await api(endpoint("/rest/v1/products", {
          select: "id,name_ar,name_en,review_status,created_at", review_status: "eq.pending", order: "created_at", limit: "100"
        }));
        container.innerHTML = (rows || []).map((product) => '<article class="operations-card operation-row"><div><h2>'
          + escapeHtml(locale === "ar" ? product.name_ar : product.name_en) + '</h2><span class="status">'
          + escapeHtml(t("review_" + product.review_status)) + '</span></div><button class="button primary" data-review-product="'
          + product.id + '" data-approved="true" type="button">' + escapeHtml(t("approve"))
          + '</button><button class="button secondary-dark" data-review-product="' + product.id
          + '" data-approved="false" type="button">' + escapeHtml(t("reject")) + "</button></article>").join("")
          || '<p class="empty-state">' + escapeHtml(t("operations_empty")) + "</p>";
        container.querySelectorAll("[data-review-product]").forEach((button) => button.addEventListener("click", async () => {
          button.disabled = true;
          try {
            await api("/rest/v1/rpc/review_product", {
              method: "POST",
              body: { p_product_id: button.dataset.reviewProduct, p_approved: button.dataset.approved === "true", p_note: null }
            });
            await loadOperations("products");
          } catch (error) {
            console.error("Product review failed.", error);
            button.disabled = false;
            showMessage(document.getElementById("operations-error"), t("request_failed"));
          }
        }));
      } else if (tab === "sellers") {
        const rows = await api("/rest/v1/rpc/list_staff_sellers", { method: "POST", body: {} });
        container.innerHTML = (rows || []).map((seller) => '<article class="operations-card operation-row"><div><h2>'
          + escapeHtml(seller.store_name) + '</h2><span class="status">' + escapeHtml(seller.status) + '</span></div>'
          + '<button class="button primary" data-seller-status="' + seller.id + '" data-status="verified" type="button">'
          + escapeHtml(t("approve")) + '</button><button class="button secondary-dark" data-seller-status="'
          + seller.id + '" data-status="rejected" type="button">' + escapeHtml(t("reject")) + "</button>"
          + (["super_admin", "finance_manager"].includes(staffRole)
            ? '<label>' + escapeHtml(t("commission_pct")) + '<input data-seller-commission="' + seller.id + '" type="number" min="0" max="100" step="0.01" value="'
              + escapeHtml(seller.commission_override == null ? "" : seller.commission_override) + '"></label><button class="button secondary-dark" data-save-commission="'
              + seller.id + '" type="button">' + escapeHtml(t("save_category")) + "</button>" : "")
          + "</article>").join("")
          || '<p class="empty-state">' + escapeHtml(t("operations_empty")) + "</p>";
        container.querySelectorAll("[data-seller-status]").forEach((button) => button.addEventListener("click", async () => {
          button.disabled = true;
          try {
            await api("/rest/v1/rpc/set_seller_status", {
              method: "POST",
              body: { p_seller_id: button.dataset.sellerStatus, p_status: button.dataset.status }
            });
            await loadOperations("sellers");
          } catch (error) {
            console.error("Seller review failed.", error);
            button.disabled = false;
            showMessage(document.getElementById("operations-error"), t("request_failed"));
          }
        }));
        container.querySelectorAll("[data-save-commission]").forEach((button) => button.addEventListener("click", async () => {
          button.disabled = true;
          try {
            const value = container.querySelector('[data-seller-commission="' + button.dataset.saveCommission + '"]').value;
            await api("/rest/v1/rpc/set_seller_commission", {
              method: "POST",
              body: { p_seller_id: button.dataset.saveCommission, p_commission_pct: value === "" ? null : Number(value) }
            });
            await loadOperations("sellers");
          } catch (error) {
            console.error("Could not save seller commission.", error);
            button.disabled = false;
            showMessage(document.getElementById("operations-error"), t("request_failed"));
          }
        }));
      } else if (tab === "companies") {
        const companies = await api(endpoint("/rest/v1/companies", {
          select: "id,name,city,verification_status", verification_status: "eq.pending", order: "created_at", limit: "100"
        }));
        container.innerHTML = (companies || []).map((company) => '<article class="operations-card operation-row"><div><h2>'
          + escapeHtml(company.name) + '</h2><span>' + escapeHtml(company.city) + '</span></div><button class="button primary" data-verify-company="'
          + company.id + '" type="button">' + escapeHtml(t("verify")) + "</button></article>").join("")
          || '<p class="empty-state">' + escapeHtml(t("operations_empty")) + "</p>";
        container.querySelectorAll("[data-verify-company]").forEach((button) => button.addEventListener("click", async () => {
          button.disabled = true;
          try {
            await api("/rest/v1/rpc/set_company_verification", {
              method: "POST",
              body: { p_company_id: button.dataset.verifyCompany, p_status: "verified" }
            });
            await loadOperations("companies");
          } catch (error) {
            console.error("Company review failed.", error);
            button.disabled = false;
            showMessage(document.getElementById("operations-error"), t("request_failed"));
          }
        }));
      } else if (tab === "categories") {
        const rows = await api("/rest/v1/rpc/staff_list_categories", { method: "POST", body: {} });
        const options = '<option value="">' + escapeHtml(t("categories")) + "</option>"
          + (rows || []).filter((category) => !category.parent_id).map((category) =>
            '<option value="' + category.id + '">' + escapeHtml(locale === "ar" ? category.name_ar : category.name_en) + "</option>").join("");
        container.innerHTML = '<form id="manage-category-form" class="request-form"><input id="manage-category-id" type="hidden">'
          + '<label>' + escapeHtml(t("category_filter")) + '<select id="manage-category-parent">' + options + "</select></label>"
          + '<label>' + escapeHtml(t("category_slug")) + '<input id="manage-category-slug" pattern="[a-z0-9]+(-[a-z0-9]+)*" required></label>'
          + '<label>' + escapeHtml(t("product_name_ar")) + '<input id="manage-category-ar" maxlength="120" required></label>'
          + '<label>' + escapeHtml(t("product_name_en")) + '<input id="manage-category-en" maxlength="120" required></label>'
          + '<label>' + escapeHtml(t("commission_pct")) + '<input id="manage-category-commission" type="number" min="0" max="100" step="0.01" value="10" required></label>'
          + '<label class="inline-control"><input id="manage-category-active" type="checkbox" checked>' + escapeHtml(t("category_active")) + "</label>"
          + '<button class="button primary" type="submit">' + escapeHtml(t("save_category")) + "</button></form>"
          + '<div class="operations-list">' + (rows || []).map((category) => '<article class="operations-card operation-row"><div><h2>'
            + escapeHtml(locale === "ar" ? category.name_ar : category.name_en) + '</h2><span>' + escapeHtml(category.slug)
            + " · " + escapeHtml(category.commission_pct) + "%</span></div><button class=\"button secondary-dark\" data-edit-category=\""
            + category.id + '" type="button">' + escapeHtml(t("edit")) + "</button></article>").join("") + "</div>";
        container.querySelectorAll("[data-edit-category]").forEach((button) => button.addEventListener("click", () => {
          const category = rows.find((row) => row.id === button.dataset.editCategory);
          if (!category) return;
          document.getElementById("manage-category-id").value = category.id;
          document.getElementById("manage-category-parent").value = category.parent_id || "";
          document.getElementById("manage-category-slug").value = category.slug;
          document.getElementById("manage-category-ar").value = category.name_ar;
          document.getElementById("manage-category-en").value = category.name_en;
          document.getElementById("manage-category-commission").value = category.commission_pct;
          document.getElementById("manage-category-active").checked = category.is_active;
          document.getElementById("manage-category-form").scrollIntoView({ behavior: "smooth" });
        }));
        document.getElementById("manage-category-form").addEventListener("submit", async (event) => {
          event.preventDefault();
          const button = event.submitter;
          button.disabled = true;
          try {
            await api("/rest/v1/rpc/manage_category", {
              method: "POST",
              body: {
                p_category_id: document.getElementById("manage-category-id").value || null,
                p_parent_id: document.getElementById("manage-category-parent").value || null,
                p_slug: document.getElementById("manage-category-slug").value.trim(),
                p_name_ar: document.getElementById("manage-category-ar").value.trim(),
                p_name_en: document.getElementById("manage-category-en").value.trim(),
                p_commission_pct: Number(document.getElementById("manage-category-commission").value),
                p_is_active: document.getElementById("manage-category-active").checked,
                p_sort_order: 0
              }
            });
            await loadCategories();
            await loadOperations("categories");
          } catch (error) {
            console.error("Could not save category.", error);
            button.disabled = false;
            showMessage(document.getElementById("operations-error"), t("request_failed"));
          }
        });
      } else if (tab === "users") {
        const users = await api(endpoint("/rest/v1/profiles", {
          select: "id,full_name,role", order: "created_at.desc", limit: "200"
        }));
        const roles = ["buyer", "super_admin", "procurement_manager", "procurement_employee", "sales_manager", "finance_manager", "operations_manager", "quality_manager"];
        container.innerHTML = (users || []).map((user) => '<article class="operations-card operation-row"><div><h2>'
          + escapeHtml(user.full_name || user.id) + '</h2><small>' + escapeHtml(user.id) + '</small></div><select data-user-role="'
          + user.id + '" ' + (user.id === session.user.id ? "disabled" : "") + '>'
          + roles.map((role) => '<option value="' + role + '" ' + (user.role === role ? "selected" : "")
            + '>' + escapeHtml(t("role_" + role)) + "</option>").join("")
          + '</select><button class="button secondary-dark" data-save-role="' + user.id + '" type="button" '
          + (user.id === session.user.id ? "disabled" : "") + '>' + escapeHtml(t("change_role")) + "</button></article>").join("");
        container.querySelectorAll("[data-save-role]").forEach((button) => button.addEventListener("click", async () => {
          button.disabled = true;
          try {
            const role = container.querySelector('[data-user-role="' + button.dataset.saveRole + '"]').value;
            await api("/rest/v1/rpc/set_profile_role", {
              method: "POST", body: { p_user_id: button.dataset.saveRole, p_role: role }
            });
            await loadOperations("users");
          } catch (error) {
            console.error("Could not change user role.", error);
            button.disabled = false;
            showMessage(document.getElementById("operations-error"), t("request_failed"));
          }
        }));
      } else if (tab === "finance") {
        const rows = await api("/rest/v1/rpc/list_unsettled_commissions", { method: "POST", body: {} });
        container.innerHTML = (rows || []).map((commission) => '<article class="operations-card operation-row"><div><h2>'
          + escapeHtml(commission.seller_name) + " · " + escapeHtml(t("order_number")) + " #"
          + escapeHtml(commission.order_number) + '</h2><span>' + escapeHtml(t("commission_due")) + ": "
          + escapeHtml(formatPrice(commission.commission_total)) + " · " + escapeHtml(t("per_unit_net")) + ": "
          + escapeHtml(formatPrice(commission.seller_net)) + '</span></div><button class="button primary" data-settle="'
          + commission.seller_order_id + '" type="button">' + escapeHtml(t("settle")) + "</button></article>").join("")
          || '<p class="empty-state">' + escapeHtml(t("no_commissions")) + "</p>";
        container.querySelectorAll("[data-settle]").forEach((button) => button.addEventListener("click", async () => {
          button.disabled = true;
          try {
            await api("/rest/v1/rpc/settle_seller_order", {
              method: "POST", body: { p_seller_order_id: button.dataset.settle }
            });
            await loadOperations("finance");
          } catch (error) {
            console.error("Commission settlement failed.", error);
            button.disabled = false;
            showMessage(document.getElementById("operations-error"), mapError(error, t("request_failed")));
          }
        }));
      }
    } catch (error) {
      console.error("Could not load operations page.", error);
      container.innerHTML = "";
      showMessage(document.getElementById("operations-error"), t("error_loading"));
    }
  }

  function updateCartView() { void loadCart(); }

  async function navigate() {
    let route = location.pathname.replace(/\/+$/, "");
    let query = location.search.replace(/^\?/, "");
    if (location.hash.startsWith("#/")) {
      const hashRoute = location.hash.slice(2);
      const separator = hashRoute.indexOf("?");
      route = separator < 0 ? hashRoute : hashRoute.slice(0, separator);
      query = separator < 0 ? "" : hashRoute.slice(separator + 1);
    }
    const path = route.replace(/^\/+/, "") || "home";
    const parts = path.split("/");
    let page = parts[0] || "home";
    const allowed = ["home", "shop", "product", "cart", "requests", "auth", "onboarding", "dashboard", "seller", "operations"];
    if (!allowed.includes(page)) page = "home";
    const params = new URLSearchParams(query);
    if ((["onboarding", "dashboard", "seller", "operations", "requests"].includes(page)) && !session) {
      try { sessionStorage.setItem("emdad-return-path", location.pathname + location.search); }
      catch (error) { console.warn("Could not save the requested page.", error); }
      navigateTo("/auth", true);
      return;
    }
    if (page === "auth" && session) { navigateTo("/dashboard", true); return; }
    document.querySelectorAll("[data-page]").forEach((section) => { section.hidden = section.dataset.page !== page; });
    document.getElementById("global-message").hidden = true;
    const defaults = {
      home: ["مستلزمات أعمالك من موردين موثوقين", t("hero_body")],
      shop: [t("shop_title"), t("shop_subtitle")],
      cart: [t("cart_title"), t("cart_estimate_note")],
      requests: [t("requests_title"), t("requests_intro")],
      dashboard: [t("dashboard_title"), t("dashboard_body")],
      seller: [t("seller_center"), t("seller_intro")],
      operations: [t("operations_center"), t("operations_intro")],
      auth: [t("auth_title"), t("hero_body")],
      onboarding: [t("onboarding_title"), t("onboarding_body")]
    };
    const seo = defaults[page] || defaults.home;
    setSeo(seo[0], seo[1], null, ["auth", "onboarding", "dashboard", "seller", "operations", "cart", "requests"].includes(page) ? false : undefined);
    if (page === "home") return;
    if (page === "shop") {
      const select = document.getElementById("shop-category");
      select.value = params.get("category") || "";
      if (params.get("q")) document.getElementById("shop-query").value = params.get("q");
      await searchCatalog(true);
    } else if (page === "product") {
      currentProduct = null;
      await loadProduct(parts[1]);
    } else if (page === "cart") {
      updateCartView();
    } else if (page === "dashboard") {
      await loadDashboard();
    } else if (page === "seller") {
      await loadSellerCenter();
    } else if (page === "operations") {
      await loadProfile();
      await loadOperations(params.get("tab") || "requests");
    } else if (page === "requests") {
      requestProductId = params.get("product");
      document.getElementById("request-items").innerHTML = "";
      if (requestProductId) {
        try {
          const rows = await api(endpoint("/rest/v1/product_public", { select: "id,name_ar,name_en", id: "eq." + requestProductId, limit: "1" }));
          const product = rows && rows[0];
          if (product) addRequestItem(product);
        } catch (error) { console.error("Could not prefill quote request.", error); }
      }
      if (!document.getElementById("request-items").children.length) addRequestItem();
      await loadRequests();
    }
  }

  document.getElementById("language-button").addEventListener("click", () => {
    locale = locale === "ar" ? "en" : "ar";
    applyLocale();
    const page = location.pathname.split("/").filter(Boolean)[0] || "home";
    if (page === "shop") void searchCatalog(true);
    if (page === "dashboard") void loadDashboard();
  });

  document.getElementById("auth-switch").addEventListener("click", () => {
    registering = !registering;
    document.getElementById("name-field").hidden = !registering;
    document.getElementById("auth-name").required = registering;
    document.getElementById("auth-password").autocomplete = registering ? "new-password" : "current-password";
    applyLocale();
    showMessage(document.getElementById("auth-message"), "");
    showMessage(document.getElementById("auth-error"), "");
  });

  document.getElementById("auth-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = document.getElementById("auth-submit");
    button.disabled = true;
    showMessage(document.getElementById("auth-message"), "");
    showMessage(document.getElementById("auth-error"), "");
    try {
      if (!configured) throw new Error(t("config_missing"));
      const email = document.getElementById("auth-email").value.trim();
      const password = document.getElementById("auth-password").value;
      const data = registering
        ? await api("/auth/v1/signup", { method: "POST", body: { email, password, data: { full_name: document.getElementById("auth-name").value.trim() } } })
        : await api("/auth/v1/token?grant_type=password", { method: "POST", body: { email, password } });
      if (registering && !(data && data.access_token)) {
        showMessage(document.getElementById("auth-message"), t("auth_signup_success"));
      } else {
        saveSession(data);
        let returnPath = "/";
        try {
          returnPath = sessionStorage.getItem("emdad-return-path") || "/";
          sessionStorage.removeItem("emdad-return-path");
        } catch (storageError) { console.warn("Could not restore the requested page.", storageError); }
        navigateTo(returnPath);
      }
    } catch (error) {
      console.error("Authentication failed.", error);
      showMessage(document.getElementById("auth-error"), configured ? t("auth_error") : t("config_missing"));
    } finally { button.disabled = false; }
  });

  document.getElementById("google-signin").addEventListener("click", () => {
    showMessage(document.getElementById("auth-message"), "");
    showMessage(document.getElementById("auth-error"), "");
    if (!configured) { showMessage(document.getElementById("auth-error"), t("config_missing")); return; }
    const redirectTo = location.origin + "/auth";
    location.assign(supabaseUrl + "/auth/v1/authorize?provider=google&redirect_to=" + encodeURIComponent(redirectTo));
  });

  async function completeOAuthSignIn() {
    const raw = location.hash.startsWith("#") ? location.hash.slice(1) : "";
    if (!raw || raw.startsWith("/")) return;
    const params = new URLSearchParams(raw);
    const accessToken = params.get("access_token");
    const failure = params.get("error") || params.get("error_code");
    if (!accessToken && !failure) return;
    history.replaceState(null, "", location.pathname + location.search);
    if (!accessToken) {
      console.error("Google sign-in failed.", params.get("error_description") || failure);
      showMessage(document.getElementById("auth-error"), t("auth_error"));
      return;
    }
    try {
      const pending = {
        access_token: accessToken,
        refresh_token: params.get("refresh_token"),
        token_type: params.get("token_type") || "bearer",
        expires_in: Number(params.get("expires_in")) || 3600,
        expires_at: Number(params.get("expires_at")) || undefined
      };
      session = pending;
      pending.user = await api("/auth/v1/user");
      saveSession(pending);
      let returnPath = "/";
      try {
        returnPath = sessionStorage.getItem("emdad-return-path") || "/";
        sessionStorage.removeItem("emdad-return-path");
      } catch (storageError) { console.warn("Could not restore the requested page.", storageError); }
      history.replaceState(null, "", returnPath.startsWith("/") ? returnPath : "/");
    } catch (error) {
      console.error("Could not finish Google sign-in.", error);
      saveSession(null);
      showMessage(document.getElementById("auth-error"), t("auth_error"));
    }
  }

  document.getElementById("company-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = document.getElementById("company-submit");
    button.disabled = true;
    showMessage(document.getElementById("company-error"), "");
    try {
      await api("/rest/v1/rpc/onboard_company", {
        method: "POST",
        body: {
          p_name: document.getElementById("company-name").value.trim(),
          p_tax_id: document.getElementById("company-tax-id").value.trim() || null,
          p_city: document.getElementById("company-city").value.trim()
        }
      });
      navigateTo("/dashboard");
    } catch (error) {
      console.error("Company onboarding failed.", error);
      showMessage(document.getElementById("company-error"), mapError(error, t("onboarding_error")));
    } finally { button.disabled = false; }
  });

  document.getElementById("shop-filters").addEventListener("submit", (event) => {
    event.preventDefault();
    void searchCatalog(true);
  });
  document.getElementById("shop-more").addEventListener("click", () => { void searchCatalog(false); });

  document.getElementById("checkout-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = document.getElementById("checkout-submit");
    button.disabled = true;
    showMessage(document.getElementById("checkout-error"), "");
    try {
      if (!session) throw new Error("AUTH_REQUIRED");
      const orderId = await api("/rest/v1/rpc/place_order", {
        method: "POST",
        body: {
          p_items: cart.map((line) => ({ product_id: line.id, quantity: line.quantity })),
          p_delivery_name: document.getElementById("delivery-name").value.trim(),
          p_delivery_phone: document.getElementById("delivery-phone").value.trim(),
          p_delivery_city: document.getElementById("delivery-city").value.trim(),
          p_delivery_address: document.getElementById("delivery-address").value.trim()
        }
      });
      cart = [];
      saveCart();
      showMessage(document.getElementById("global-message"), t("order_success") + String(orderId).slice(0, 8));
      navigateTo("/dashboard");
    } catch (error) {
      console.error("Checkout failed.", error);
      showMessage(document.getElementById("checkout-error"), mapError(error, t("order_failed")));
    } finally { button.disabled = false; }
  });

  document.getElementById("add-request-item").addEventListener("click", () => addRequestItem());
  document.getElementById("request-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = document.getElementById("request-submit");
    button.disabled = true;
    showMessage(document.getElementById("request-error"), "");
    showMessage(document.getElementById("request-success"), "");
    try {
      const companies = await loadCompanies();
      const company = companies.find((entry) => entry.member_role === "owner");
      if (!company) throw new Error("COMPANY_MEMBERSHIP_REQUIRED");
      const items = Array.from(document.querySelectorAll(".request-item-row")).map((row) => ({
        product_id: row.dataset.productId || null,
        specifications: row.querySelector(".request-item-specs").value.trim(),
        quantity: row.querySelector(".request-item-quantity").value || null,
        unit: row.querySelector(".request-item-unit").value.trim() || null
      }));
      const requestId = await api("/rest/v1/rpc/submit_procurement_request", {
        method: "POST",
        body: {
          p_company_id: company.id,
          p_title: document.getElementById("request-title").value.trim(),
          p_description: document.getElementById("request-description").value.trim(),
          p_items: items
        }
      });
      const rows = await api(endpoint("/rest/v1/procurement_requests", {
        select: "tracking_number", id: "eq." + requestId, limit: "1"
      }));
      showMessage(document.getElementById("request-success"), t("request_success") + (rows[0] ? rows[0].tracking_number : ""));
      document.getElementById("request-form").reset();
      if (requestProductId) {
        const product = currentProduct;
        document.getElementById("request-items").innerHTML = "";
        addRequestItem(product && product.id === requestProductId ? product : null);
      } else {
        document.getElementById("request-items").innerHTML = "";
        addRequestItem();
      }
      const files = Array.from(document.getElementById("request-files").files || []);
      if (files.length) {
        try { await uploadRequestAttachments(requestId, files); }
        catch (error) {
          console.error("Request created but attachment upload failed.", error);
          showMessage(document.getElementById("request-success"), t("request_partial_upload"));
        }
      }
      await loadRequests();
    } catch (error) {
      console.error("Request submission failed.", error);
      showMessage(document.getElementById("request-error"), mapError(error, t("request_submit_error")));
    } finally { button.disabled = false; }
  });

  document.getElementById("seller-apply").addEventListener("click", async () => {
    const button = document.getElementById("seller-apply");
    button.disabled = true;
    showMessage(document.getElementById("seller-error"), "");
    try {
      await api("/rest/v1/rpc/request_seller_store", {
        method: "POST",
        body: {
          p_company_id: document.getElementById("seller-company").value,
          p_store_name: document.getElementById("seller-store-name").value.trim(),
          p_description: document.getElementById("seller-store-description").value.trim()
        }
      });
      await loadSellerCenter();
    } catch (error) {
      console.error("Seller store application failed.", error);
      showMessage(document.getElementById("seller-error"), mapError(error, t("seller_apply_error")));
    } finally { button.disabled = false; }
  });

  document.getElementById("new-product").addEventListener("click", () => {
    document.getElementById("product-form").reset();
    document.getElementById("edit-product-id").value = "";
    document.getElementById("product-unit").value = locale === "ar" ? "قطعة" : "piece";
    document.getElementById("product-form").hidden = false;
    document.getElementById("product-form").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  document.getElementById("cancel-product").addEventListener("click", () => {
    document.getElementById("product-form").hidden = true;
    document.getElementById("product-form").reset();
  });
  document.getElementById("product-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = event.submitter;
    button.disabled = true;
    showMessage(document.getElementById("product-save-error"), "");
    try {
      const productId = document.getElementById("edit-product-id").value || null;
      const specs = {};
      parseLines(document.getElementById("product-specs").value, ":").forEach((pair) => {
        if (pair.length >= 2 && pair[0]) specs[pair[0]] = pair.slice(1).join(":").trim();
      });
      const tiers = parseLines(document.getElementById("product-tiers").value, ",").map((pair) => ({
        min_qty: Number(pair[0]), unit_price: Number(pair[1])
      }));
      if (tiers.some((tier) => !Number.isInteger(tier.min_qty) || tier.min_qty < 1 || !Number.isFinite(tier.unit_price) || tier.unit_price <= 0)) {
        throw new Error("INVALID_PRODUCT_TIERS");
      }
      const data = {
        seller_id: selectedSellerId,
        category_id: document.getElementById("product-category").value,
        name_ar: document.getElementById("product-name-ar").value.trim(),
        name_en: document.getElementById("product-name-en").value.trim(),
        description_ar: document.getElementById("product-description-ar").value.trim(),
        description_en: document.getElementById("product-description-en").value.trim(),
        specifications: specs,
        brand: document.getElementById("product-brand").value.trim() || null,
        sku: document.getElementById("product-sku").value.trim() || null,
        unit: document.getElementById("product-unit").value.trim(),
        unit_price: Number(document.getElementById("product-price").value),
        min_order_qty: Number(document.getElementById("product-min-qty").value),
        stock_qty: Number(document.getElementById("product-stock").value),
        shipping_fee: Number(document.getElementById("product-shipping").value),
        vat_rate: Number(document.getElementById("product-vat").value),
        is_active: true
      };
      const savedId = await api("/rest/v1/rpc/save_seller_product", {
        method: "POST", body: { p_product_id: productId, p_data: data, p_tiers: tiers }
      });
      const files = Array.from(document.getElementById("product-images").files || []);
      if (files.length) await uploadProductImages(savedId, files);
      document.getElementById("product-form").hidden = true;
      showMessage(document.getElementById("seller-error"), t("product_saved"));
      await loadSellerProducts();
    } catch (error) {
      console.error("Product save failed.", error);
      showMessage(document.getElementById("product-save-error"), mapError(error, t("save_product_error")));
    } finally { button.disabled = false; }
  });

  document.querySelectorAll("[data-seller-tab]").forEach((button) => button.addEventListener("click", () => {
    document.querySelectorAll("[data-seller-tab]").forEach((tab) => tab.classList.toggle("active", tab === button));
    const products = button.dataset.sellerTab === "products";
    document.getElementById("seller-products-panel").hidden = !products;
    document.getElementById("seller-orders-panel").hidden = products;
  }));
  document.querySelectorAll("[data-operations-tab]").forEach((button) => button.addEventListener("click", () => {
    document.querySelectorAll("[data-operations-tab]").forEach((tab) => tab.classList.toggle("active", tab === button));
    void loadOperations(button.dataset.operationsTab);
  }));

  document.getElementById("signout-button").addEventListener("click", async () => {
    try {
      if (configured && session) {
        const response = await fetch(supabaseUrl + "/auth/v1/logout", {
          method: "POST", headers: { apikey: anonKey, Authorization: "Bearer " + session.access_token }
        });
        if (!response.ok) throw new Error("Sign out failed with HTTP " + response.status);
      }
      saveSession(null);
      navigateTo("/");
    } catch (error) {
      console.error("Sign out failed.", error);
      showMessage(document.getElementById("global-message"), t("request_failed"));
    }
  });

  document.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = event.target.closest("a");
    if (!anchor || anchor.target === "_blank") return;
    const href = anchor.getAttribute("href") || "";
    if (href.startsWith("#/")) {
      event.preventDefault();
      navigateTo(href);
      return;
    }
    if (href.startsWith("#")) return;
    const destination = new URL(anchor.href, location.href);
    if (destination.origin === location.origin && destination.pathname.startsWith("/")) {
      event.preventDefault();
      navigateTo(destination.pathname + destination.search);
    }
  });
  window.addEventListener("popstate", () => { void navigate(); });
  window.addEventListener("hashchange", () => { void navigate(); });
  applyLocale();
  updateNavigation();
  void loadCategories();
  void completeOAuthSignIn().then(() => {
    if (session) void loadProfile().catch((error) => {
      console.error("Could not validate the current account.", error);
      saveSession(null);
    });
    return navigate();
  });
}());
