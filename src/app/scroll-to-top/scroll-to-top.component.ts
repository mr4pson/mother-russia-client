import { WINDOW } from '@ng-toolkit/universal';
import { Component, OnInit , Inject} from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.css']
})
export class ScrollToTopComponent implements OnInit {
  constructor(@Inject(WINDOW) private window: Window, ) { }

  ngOnInit() {
    $("button.scroltop").on('click', function() {
      $("html, body").animate({
				scrollTop: 0
			}, 1000);
			return false;
		});

		$(this.window).on("scroll", function() {
			var scroll = $(this.window).scrollTop();
			if (scroll > 900) {
				$("button.scroltop").fadeIn(1000);
			} else {
				$("button.scroltop").fadeOut(1000);
			}
    });
    $(this.window).on('scroll', function () {
      // > Window on scroll header color fill 
      var scroll = $(this.window).scrollTop();
      if(scroll >= 100) {
          $(".is-fixed").addClass("color-fill");
      } else {
          $(".is-fixed").removeClass("color-fill");
      }
    });
    
  }

}