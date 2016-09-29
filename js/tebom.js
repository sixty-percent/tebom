
      $(document).on('click','.ion-trash-b',function(){
        var that = $(this);
        var targetContent = $(this).parents('.content-item').find('.inner-item').html();

        if (targetContent.length > 8) {
          swal({
            title: 'この要素を削除しますか？',
            text: "削除した要素は元に戻せません。",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: '削除',
            cancelButtonText: 'キャンセル',
          }).then(function() {
            that.parents(".content-item").remove();
          })
        } else {
          that.parents(".content-item").remove();
        }
      });

      $(document).on('click','.ion-edit',function(){
        var self = $(this).parents('.content-item');
        var mirror = self.find('.inner-item');

        switch (self.data('type')) {
          case 'h3':
            swal({
              title: '見出しを編集',
              input: 'text',
              inputValue: mirror.text(),
              showCancelButton: true,
              confirmButtonText: "挿入",
              confirmButtonColor: "#3085d6",
              cancelButtonText: "キャンセル",
              inputValidator: function(value) {
                return new Promise(function(resolve, reject) {
                  if (value) {
                    resolve();
                  } else {
                    reject('見出しを入力してください');
                  }
                });
              }
            }).then(function(result) {
              self.after("<div class='content-item'><h3 class='inner-item'>" + result + "</h3><div class='edit-menu'><i class='icon ion-edit'></i><i class='icon ion-arrow-expand'></i><i class='icon ion-arrow-shrink'></i><i class='icon ion-android-color-palette'></i><i class='icon ion-trash-b'></i><i class='icon ion-link'></i><i class='icon ion-arrow-up-b'></i><i class='icon ion-arrow-down-b'></i></div></div>");
              self.remove();
              swal.close();
            });
            break;
          case 'p':
            swal({
              title: '文章を編集',
              input: 'textarea',
              inputValue: mirror.text(),
              width: 1000,
              showCancelButton: true,
              confirmButtonText: "挿入",
              confirmButtonColor: "#3085d6",
              cancelButtonText: "キャンセル",
              inputValidator: function(value) {
                return new Promise(function(resolve, reject) {
                  if (value) {
                    resolve();
                  } else {
                    reject('文章を入力してください');
                  }
                });
              }
            }).then(function(result) {
              self.after("<div class='content-item'><p class='inner-item'>" + result + "</p><div class='edit-menu'><i class='icon ion-edit'></i><i class='icon ion-paintbrush></i><i class='icon ion-arrow-expand'></i><i class='icon ion-arrow-shrink'></i><i class='icon ion-android-checkbox-blank'></i><i class='icon ion-trash-b'></i><i class='icon ion-link'></i><i class='icon ion-arrow-up-b'></i><i class='icon ion-arrow-down-b'></i></div></div>");
              self.remove();
              swal.close();
            })
            break;

          default:
            alert(self.data('type'));
            break;
        }
      });

      $(document).on('click','.ion-paintbrush',function(){
        var self = $(this).parents('.content-item');
        var item = self.find('.inner-item');

        item.toggleClass('item-bold');
        return false;
      });

      $(document).on('click','.ion-link',function(){
        var self = $(this).parents('.content-item');
        var item = self.find('.inner-item');

        swal({
          title: 'リンクを作成',
          input: 'text',
          showCancelButton: true,
          confirmButtonText: "リンクを挿入",
          confirmButtonColor: "#3085d6",
          cancelButtonText: "キャンセル",
          inputValidator: function(value) {
            return new Promise(function(resolve, reject) {
              if (value) {
                resolve();
              } else {
                reject('見出しを入力してください');
              }
            });
          }
        }).then(function(result) {
          item.unwrap("a");
          item.wrap("<a href='" + result + "'></a>");
        });

        return false;
      });

      $(document).on('click','.ion-arrow-up-b',function(){
        var self = $(this).parents('.content-item');
        var prev = $(this).parents('.content-item').prev();
        var prevHtml = prev.html();
        if(prevHtml === undefined){
          swal({title: "最初の要素です。", timer: 600});
        } else {
          prev.before(self.prop('outerHTML'));
          self.remove();
        }
        return false;
      });

      $(document).on('click','.ion-arrow-down-b',function(){
        var self = $(this).parents('.content-item');
        var next = $(this).parents('.content-item').next();
        var nextHtml = next.html();
        if(nextHtml === undefined){
          swal({title: "最後の要素です。", timer: 600});
        } else {
          next.after(self.prop('outerHTML'));
          self.remove();
        }
        return false;
      });

      $(document).on('click','.ion-arrow-expand',function(){
        var self = $(this).parents('.content-item');
        var item = self.find('.inner-item');

        if (self.data('type') == 'hr') {
          var itemBorderWidth = item.css('border-width');
          var newitemBorderWidth = parseInt(itemBorderWidth) + 1;

          item.css('border-width', newitemBorderWidth);
        } else {
          var itemFontSize = item.css('font-size');
          var newitemFontSize = parseInt(itemFontSize) + 2;

          item.css('font-size', newitemFontSize);
        }

        return false;
      });

      $(document).on('click','.ion-arrow-shrink',function(){
        var self = $(this).parents('.content-item');
        var item = self.find('.inner-item');

        if (self.data('type') == 'hr') {
          var itemBorderWidth = item.css('border-width');
          var newitemBorderWidth = parseInt(itemBorderWidth) - 1;

          item.css('border-width', newitemBorderWidth);
        } else {
          var itemFontSize = item.css('font-size');
          var newitemFontSize = parseInt(itemFontSize) - 2;

          item.css('font-size', newitemFontSize);
        }

        return false;
      });

      $(document).on('click','.ion-android-color-palette',function(){
        var that = $(this);
        var mirror = "<h3 class='mirror'>" + $(this).parents('.content-item').find('.inner-item').text() + "</h3>";

        swal({
          title: '色を選択',
          input: 'select',
          inputOptions: {
            '#999': 'Grey',
            '#CF000F': 'Red',
            '#2C82C9': 'Blue',
            '#71BA51': 'Green',
            '#282830': 'Black',
            '#EEE657': 'Yellow',
            '#FD5B03': 'Orange',
            '#523D1F': 'Brown',
            '#D33257': 'Pink',
            '#ffffff': 'white',
          },
          text: mirror,
          inputPlaceholder: '色を選択',
          showCancelButton: true,
        }).then(function(result) {
          var self = $(that).parents('.content-item');
          var target = self.find('.inner-item');
          target.css('color', result);
          target.attr('color', result);
        })
      });

      $(".add-h3").click(function(){
        swal({
          title: '見出しを入力',
          input: 'text',
          showCancelButton: true,
          confirmButtonText: "挿入",
          confirmButtonColor: "#3085d6",
          cancelButtonText: "キャンセル",
          inputValidator: function(value) {
            return new Promise(function(resolve, reject) {
              if (value) {
                resolve();
              } else {
                reject('見出しを入力してください');
              }
            });
          }
        }).then(function(result) {
          $(".preview-area").append("<div class='content-item' data-type='h3'><h3 class='inner-item'>" + result + "</h3><div class='edit-menu'><i class='icon ion-edit'></i><i class='icon ion-arrow-expand'></i><i class='icon ion-arrow-shrink'></i><i class='icon ion-android-color-palette'></i><i class='icon ion-trash-b'></i><i class='icon ion-link'></i><i class='icon ion-arrow-up-b'></i><i class='icon ion-arrow-down-b'></i></div></div>");
          swal.close();
        })
      });

      $(".add-box").click(function(){
        swal({
          title: 'ボックスを作成',
          input: 'textarea',
          width: 1000,
          showCancelButton: true,
          confirmButtonText: "挿入",
          confirmButtonColor: "#3085d6",
          cancelButtonText: "キャンセル",
          inputValidator: function(value) {
            return new Promise(function(resolve, reject) {
              if (value) {
                resolve();
              } else {
                reject('文章を入力してください');
              }
            });
          }
        }).then(function(result) {
          $(".preview-area").append("<div class='content-item box-item' data-type='box'><p class='inner-item'>" + result + "</p><div class='edit-menu'><i class='icon ion-edit'></i><i class='icon ion-arrow-expand'></i><i class='icon ion-arrow-shrink'></i><i class='icon ion-trash-b'></i><i class='icon ion-link'></i><i class='icon ion-arrow-up-b'></i><i class='icon ion-arrow-down-b'></i></div></div>");
          swal.close();
        })
      });

      $(".add-p").click(function(){
        swal({
          title: '文章を入力',
          input: 'textarea',
          width: 1000,
          showCancelButton: true,
          confirmButtonText: "挿入",
          confirmButtonColor: "#3085d6",
          cancelButtonText: "キャンセル",
          inputValidator: function(value) {
            return new Promise(function(resolve, reject) {
              if (value) {
                resolve();
              } else {
                reject('文章を入力してください');
              }
            });
          }
        }).then(function(result) {
          $(".preview-area").append("<div class='content-item' data-type='p'><p class='inner-item'>" + result + "</p><div class='edit-menu'><i class='icon ion-edit'></i><i class='icon ion-paintbrush'></i><i class='icon ion-arrow-expand'></i><i class='icon ion-arrow-shrink'></i><i class='icon ion-android-color-palette'></i><i class='icon ion-trash-b'></i><i class='icon ion-link'></i><i class='icon ion-arrow-up-b'></i><i class='icon ion-arrow-down-b'></i></div></div>");
          swal.close();
        })
      });

      $(".add-img").click(function(){
        swal({
          title: '画像をアップロード',
          input: 'file',
          inputAttributes: {
            accept: 'image/*'
          }
        }).then(function(file) {
          var reader = new FileReader;
          reader.onload = function(e) {
            $(".preview-area").append("<div class='content-item' data-type='img'><img style='width: 100%;' class='inner-item' src='" + e.target.result + "'><div class='edit-menu'><i class='icon ion-trash-b'></i><i class='icon ion-link'></i><i class='icon ion-arrow-up-b'></i><i class='icon ion-arrow-down-b'></i></div></div>");
            swal.close();
          };
          reader.readAsDataURL(file);
        })
      });

      $(".add-img-url").click(function(){
        swal({
          title: '画像のURLを入力',
          input: 'text',
          showCancelButton: true,
          confirmButtonText: "挿入",
          confirmButtonColor: "#3085d6",
          cancelButtonText: "キャンセル",
          inputValidator: function(value) {
            return new Promise(function(resolve, reject) {
              if (value) {
                resolve();
              } else {
                reject('文章を入力してください');
              }
            });
          }
        }).then(function(result) {
          $(".preview-area").append("<div class='content-item' data-type='img-url'><img style='width: 100%' class='inner-item' src='" + result + "'><div class='edit-menu'><a class='edit-item'><i class='icon ion-edit'></i></a><i class='icon ion-trash-b'></i><i class='icon ion-link'></i><i class='icon ion-arrow-up-b'></i><i class='icon ion-arrow-down-b'></i></div></div>");
          swal.close();
        })
      });

      $(".add-line").click(function(){
        $(".preview-area").append("<div class='content-item hr-wrapper' data-type='hr'><hr class='inner-item' /><div class='edit-menu'><i class='icon ion-arrow-expand'></i><i class='icon ion-arrow-shrink'></i><i class='icon ion-android-color-palette'></i><i class='icon ion-trash-b'></i><i class='icon ion-link'></i><i class='icon ion-arrow-up-b'></i><i class='icon ion-arrow-down-b'></i></div></div>");
      });

      $(document).on('click','.content-item',function(){
        $(".edit-menu").hide();
        $(this).find(".edit-menu").toggle();
      });

      $('.tool-toggle-btn').click(function(){
        $(this).find(".icon").toggleClass("ion-plus");
        $(this).find(".icon").toggleClass("ion-close");
        $('.tool-item').toggle();
      });

      $(function($) {
        $('.swal2-select').change(function() {
          $('.mirror').css('color', $('.swal2-select').val());
        });
      });

      $('.show-preview').click(function(){
        var content = $('.preview-area').html();
        $('.edit-menu').remove();
        var contentItem = $('.preview-area').find('.content-item');
        contentItem.removeAttr("data-type");
        contentItem.removeClass("content-item");

        $('.preview-area').toggle();

        $('.hr-wrapper').css('padding', '0')
        $('.preview-inner').html($('.preview-area').html());

        $('.fkr-original-title').html($('#article-title').val());

        $('.preview').toggle();

        $('.preview-area').html(content);
      });

      $('.preview-close-btn').click(function(){

        $('.preview-area').toggle();
        $('.preview').toggle();

      });

      $('.remove-item').click(function(){
        swal({
          title: '内容を全て削除しますか？',
          text: "削除した要素は元に戻せません。",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          confirmButtonText: '削除',
          cancelButtonText: 'キャンセル',
        }).then(function() {
          $('.preview-area').empty();
        });
      });
