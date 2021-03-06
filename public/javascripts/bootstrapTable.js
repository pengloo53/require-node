var $table = $('#table'),
    $remove = $('#remove'),
    selections = [];
/* bootstrap-table */
var scripts = [
  location.search.substring(1) || 'stylesheets/bootstrap-table/src/bootstrap-table.js',
  'stylesheets/bootstrap-table/src/extensions/export/bootstrap-table-export.js',
  'http://rawgit.com/hhurz/tableExport.jquery.plugin/master/tableExport.js',
  '/stylesheets/bootstrap-table/dist/locale/bootstrap-table-zh-CN.js'
];

/* 获取Message表的bootstrap-table */
function initTableFromMessage() {
  $table.bootstrapTable({
    toolbar: '#toolbar',
    search: false,
    showRefresh: true,
    showToggle: true,
    showColumns: true,
    showExport: true,
    detailView: true,
    detailFormatter: detailFormatter,
    minimumCountColumns: 3,
    showPaginationSwitch: true,
    pagination: true,
    idField: 'id',
    sortOrder: 'desc',
    sortName: 'id',
    pageList: '[10, 25, 50, 100, ALL]',
    sidePagination: 'server',
    url: '/admin/data/message',
    ajaxOptions: {global: false},
    responseHandle: responseHandler,
    height: 550,
    columns: [
      {
        field: 'state',
        checkbox: true,
        valign: 'middle',
        align: 'center'
      }, {
        title: '#',
        field: 'id',
        align: 'center',
        visible: true,
        valign: 'middle',
        sortable: true
      }, {
        field: 'status',
        title: '状态',
        valign: 'middle',
        align: 'center',
        sortable: true,
        formatter: convertStatusFormatter
      }, {
        field: 'category',
        title: '分类',
        sortable: true,
        valign: 'middle',
        align: 'center'
      }, {
        field: 'keyname',
        title: '关键词',
        valign: 'middle',
        formatter: keyFormatter  // 显示成badge的样式
      }, {
        field: 'title',
        title: '主题',
        sortable: false,
        valign: 'middle',
        align: 'center'
      }, {
        field: 'content',
        title: '内容',
        sortable: false,
        valign: 'middle',
        visible: false,

        align: 'center'
      }, {
        field: 'dept',
        title: '部门',
        sortable: false,
        valign: 'middle',
        align: 'center'
      }, {
        field: 'reContent',
        title: '回复内容',
        sortable: false,
        valign: 'middle',
        visible: false,
        align: 'center'
      }, {
        field: 'time',
        title: '时间',
        sortable: true,
        valign: 'middle',
        visible: false,
        align: 'center'
      }, {
        field: 'user',
        title: '用户',
        sortable: false,
        valign: 'middle',
        visible: false,
        align: 'center'
      }, {
        field: 'upNum',
        title: '数量',
        sortable: true,
        valign: 'middle',
        visible: true,
        align: 'center'
      }, {
        field: 'operate',
        title: '操作',
        align: 'center',
        valign: 'middle',
        events: operateEvents,
        formatter: operateFormatter
      }
    ]
  });

  /* status convert to comments */
  function convertStatusFormatter(data) {
    var comments = '';
    switch (data) {
      case 1:
        comments = '<label class="label label-danger">已提交</label>';
        break;
      case 2:
        comments = '<label class="label label-primary">已解答</label>';
        break;
      case 3:
        comments = '<label class="label label-warning">跟进中</label>';
        break;
      case 4:
        comments = '<label class="label label-success">已解决</label>';
        break;
    }
    return comments;
  }

  /* keyname formatter */
  function keyFormatter(data) {
    var keys = data.split(',');
    var keyField = '';
    for (var i = 0; i < keys.length; i++) {
      keyField += '<li class="badge">' + keys[i] + '</li>';
    }
    return '<ul class="list-inline">' + keyField + '</ul>';
  }

  /* detail fromatter */
  function detailFormatter(index, row) {
    var html = [];
    $.each(row, function (key, value) {
      if (key == 'content' || key == 'reContent' || key == 'image') {
        var keyName = '';
        switch (key) {
          case 'content':
            keyName = '详细内容';
            break;
          case 'reContent':
            keyName = '回复内容';
            break;
          case 'image':
            keyName = '附图';
            break;
        }
        if (key == 'image' && value) {
          html.push('<p><b>' + keyName + '：</b><ul class="list-inline">');
          var imageList = value.split(',');
          for (var i = 0; i < imageList.length; i++) {
            html.push('<li><img width="20%" src="/images/uploads/' + imageList[i] + '"></li>');
          }
          html.push('</ul>');
        } else {
          html.push('<p><b>' + keyName + '：</b>' + value + '</p>');
        }
      }
    });
    return html.join('');
  }

  /* operate formatter */
  function operateFormatter(value, row, index) {
    return [
      '<a class="op" href="javascript:void(0)" title="show">',
      '<i class="glyphicon glyphicon-eye-open text-primary"></i></a>',
      '<a class="op" href="javascript:void(0)" title="edit">',
      '<i class="glyphicon glyphicon-pencil text-warning"></i></a>',
      '<a class="op" href="javascript:void(0)" title="reply">',
      '<i class="glyphicon glyphicon-edit text-info"></i></a>',
      '<a class="op" href="javascript:void(0)" title="remove">',
      '<i class="glyphicon glyphicon-remove text-danger"></i></a>'
    ].join('');
  }

  // sometimes footer render error.
  setTimeout(function () {
    $table.bootstrapTable('resetView');
  }, 200);
  $table.on('check.bs.table uncheck.bs.table ' +
      'check-all.bs.table uncheck-all.bs.table', function () {
    $remove.prop('disabled', !$table.bootstrapTable('getSelections').length);
    // save your data, here just save the current page
    selections = getIdSelections();
    // push or splice the selections if you want to save all data selections
  });

  $table.on('all.bs.table', function (e, name, args) {
    console.log(name, args);
  });
  $remove.click(function () {
    var ids = getIdSelections();
    $table.bootstrapTable('remove', {
      field: 'id',
      values: ids
    });
    $remove.prop('disabled', true);
  });
  /*  $(window).resize(function () {
   $table.bootstrapTable('resetView', {
   height: getHeight()
   });
   });*/
}

function getIdSelections() {
  return $.map($table.bootstrapTable('getSelections'), function (row) {
    return row.id
  });
}
function responseHandler(res) {
  $.each(res.rows, function (i, row) {
    row.state = $.inArray(row.id, selections) !== -1;
  });
  return res;
}

var clickId = ''; // 最后点击的id
$('#replyConfirm').click(function () {
  if(clickId != '') {
    $.ajax({
      url: "/admin/reply",
      method: 'POST',
      data: {
        id: clickId,
        reContent: $('textarea[name=reContent]').val(),
        status: $('select option:selected').val()
      },
      success: function (result) {
        $('#replyModal').modal('hide');
        $table.bootstrapTable('refresh');
      }
    });
  }
});
$('#delConfirm').click(function () {
  if(clickId != ''){
    $.ajax({
      url: '/admin/del/message',
      method: 'POST',
      data: {
        id: clickId
      },
      success: function (result) {
        $('#removeModal').modal('hide');
        $table.bootstrapTable('remove', {
          field: 'id',
          values: [clickId]
        });
      }
    });
  }
});

window.operateEvents = {
  'click [title=show]': function (e, value, row, index) {
    if (!$('tr[data-index="' + index + '"]+tr.detail-view').html()) {
      $('#table').bootstrapTable('expandRow', index);
    } else {
      $('#table').bootstrapTable('collapseRow', index);
    }
  },
  'click [title=edit]': function (e, value, row, index) {
    // alert('You click edit action, row: ' + JSON.stringify(row));
    // confirm('确认编辑吗？');
    alert('编辑功能暂不开放');
  },
  'click [title=reply]': function (e, value, row, index) {
    // var messageId = row.id;
    var title = row.title;
    // alert(row.id);
    var reContent = row.reContent;
    $('#myReplyModalLabel').html('回复主题：' + title);
    $('textarea[name=reContent]').val(reContent);
    $('#replyModal').modal('show');
    clickId = row.id;
  },
  'click [title=remove]': function (e, value, row, index) {
    $('#removeModal').modal('show');
    clickId = row.id;
  }
};


$(function () {
  eachSeries(scripts, getScript, initTableFromMessage);
});

function eachSeries(arr, iterator, callback) {
  callback = callback || function () {
      };
  if (!arr.length) {
    return callback();
  }
  var completed = 0;
  var iterate = function () {
    iterator(arr[completed], function (err) {
      if (err) {
        callback(err);
        callback = function () {
        };
      }
      else {
        completed += 1;
        if (completed >= arr.length) {
          callback(null);
        }
        else {
          iterate();
        }
      }
    });
  };
  iterate();
}
function getScript(url, callback) {
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.src = url;
  var done = false;
  // Attach handlers for all browsers
  script.onload = script.onreadystatechange = function () {
    if (!done && (!this.readyState ||
        this.readyState == 'loaded' || this.readyState == 'complete')) {
      done = true;
      if (callback)
        callback();
      // Handle memory leak in IE
      script.onload = script.onreadystatechange = null;
    }
  };
  head.appendChild(script);
  // We handle everything using the script element injection
  return undefined;
}