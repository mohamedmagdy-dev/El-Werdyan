(function ($) {
  "use strict";

  // Dropdown on mouse hover
  $(document).ready(function () {
    function toggleNavbarMethod() {
      if ($(window).width() > 992) {
        $(".navbar .dropdown")
          .on("mouseover", function () {
            $(".dropdown-toggle", this).trigger("click");
          })
          .on("mouseout", function () {
            $(".dropdown-toggle", this).trigger("click").blur();
          });
      } else {
        $(".navbar .dropdown").off("mouseover").off("mouseout");
      }
    }
    toggleNavbarMethod();
    $(window).resize(toggleNavbarMethod);
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Portfolio isotope and filter
  var portfolioIsotope = $(".portfolio-container").isotope({
    itemSelector: ".portfolio-item",
    layoutMode: "fitRows",
  });

  $("#portfolio-flters li").on("click", function () {
    $("#portfolio-flters li").removeClass("active");
    $(this).addClass("active");

    portfolioIsotope.isotope({ filter: $(this).data("filter") });
  });

  // Post carousel
  $(".post-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 2,
      },
    },
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    center: true,
    autoplay: true,
    smartSpeed: 2000,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });
})(jQuery);

document.addEventListener("DOMContentLoaded", function () {
  // استدعاء الملف JSON عند تحميل الصفحة
  fetch("../books.json")
    .then((response) => response.json())
    .then((data) => {
      displayData(data);
    })
    .catch((error) => {
      console.error("حدث خطأ: ", error);
    });
});

document.addEventListener("DOMContentLoaded", function () {
  // العناصر اللازمة لعرض الرمز المتحرك أثناء تحميل البيانات
  const classContainer = document.getElementById("class-container");
  const spinner = document.createElement("div");
  spinner.className = "spinner-border text-primary";
  spinner.setAttribute("role", "status");

  const spinnerText = document.createElement("span");
  spinnerText.className = "visually-hidden";
  spinnerText.textContent = "";

  spinner.appendChild(spinnerText);
  classContainer.appendChild(spinner);

  // جلب البيانات وعرضها على الصفحة
  fetch("../books.json")
    .then((response) => response.json())
    .then((data) => {
      classContainer.removeChild(spinner); // إزالة الرمز المتحرك بمجرد الانتهاء من جلب البيانات
      displayData(data.books);
    })
    .catch((error) => {
      spinnerText.textContent = "خطأ: " + error.message;
      console.error("حدث خطأ في جلب الملف JSON: ", error);
    });
});

function displayData(books) {
  const classContainer = document.getElementById("class-container");

  books.forEach((book) => {
    const classCard = document.createElement("div");
    classCard.className = "col-lg-4 mb-5 position-relative"; // أضيفت position-relative هنا

    const cardCloseButton = document.createElement("button");
    cardCloseButton.type = "button";
    cardCloseButton.className =
      "btn btn-danger position-absolute top-0 end-0 mt-2 me-2 close-btn"; // تمت إضافة الأنماط للزر وتم تغيير التنسيق
    cardCloseButton.textContent = "x";

    cardCloseButton.addEventListener("click", () => {
      classContainer.removeChild(classCard);
    });

    const cardTitle = document.createElement("h2");
    cardTitle.className = "card-title";
    cardTitle.textContent = book.title;

    const cardPrice = document.createElement("p");
    cardPrice.className = "card-text";
    cardPrice.textContent = "Price: " + book.price;

    const cardDescription = document.createElement("p");
    cardDescription.className = "card-text";
    cardDescription.textContent = book.description;

    const cardActions = document.createElement("div");
    cardActions.className =
      "card-actions d-flex align-items-center justify-content-between";

    const showContentButton = document.createElement("button");
    showContentButton.type = "button";
    showContentButton.className = "btn btn-primary";
    showContentButton.textContent = "Show Content";

    const showDownloadButton = document.createElement("a");
    showDownloadButton.href = book.link;
    showDownloadButton.target = "_blank";
    showDownloadButton.className = "btn btn-success";
    showDownloadButton.textContent = "Download";

    showContentButton.addEventListener("click", () => {
      const descriptionContainer = document.getElementById(
        "description-container"
      );
      descriptionContainer.textContent = book.description;

      // إضافة زر للإغلاق
      const closeButton = document.createElement("button");
      closeButton.type = "button";
      closeButton.className = "btn btn-danger ms-4";
      closeButton.textContent = "x";
      descriptionContainer.appendChild(closeButton);

      // إضافة حدث استماع للزر لإغلاق الوصف
      closeButton.addEventListener("click", () => {
        descriptionContainer.textContent = ""; // قم بمسح محتوى الوصف عند الإغلاق
      });
    });

    cardActions.appendChild(showContentButton);
    cardActions.appendChild(showDownloadButton);

    const cardContainer = document.createElement("div");
    cardContainer.className = "card border-0 bg-light shadow-sm pb-2 p-4";

    cardContainer.appendChild(cardCloseButton); // أضيف زر الإغلاق أولاً
    cardContainer.appendChild(cardTitle);
    cardContainer.appendChild(cardPrice);
    cardContainer.appendChild(cardDescription);
    cardContainer.appendChild(cardActions);

    classCard.appendChild(cardContainer);
    classContainer.appendChild(classCard);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const bookForm = document.getElementById("bookForm");

  bookForm.addEventListener("submit", function (e) {
    e.preventDefault(); // منع الإرسال الافتراضي للنموذج

    // جمع البيانات المدخلة
    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const link = document.getElementById("link").value;
    const description = document.getElementById("description").value;

    // بناء البيانات للإرسال
    const bookData = {
      title: title,
      price: price,
      link: link,
      description: description,
    };

    // إجراء طلب POST إلى الملف JSON
    fetch("http://localhost:9000/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    })
      .then((response) => response.json())
      .then((data) => {
        // قد تريد تحديث واجهة المستخدم هنا بعد نجاح الإضافة
        console.log("تمت إضافة الكتاب:", data);

        // مسح الحقول بعد الإرسال
        document.getElementById("title").value = "";
        document.getElementById("price").value = "";
        document.getElementById("link").value = "";
        document.getElementById("description").value = "";
      })
      .catch((error) => {
        console.error("حدث خطأ أثناء إضافة الكتاب:", error);
      });
  });
});
