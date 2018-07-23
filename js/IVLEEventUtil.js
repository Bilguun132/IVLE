//const LAPI_KEY = "vgaDFiGZEsmU3uYqoFd7D";
const LAPI_KEY = "WcX3K8ubjRYlBkBKwXtar"; //dev
const SERVER_URL = "https://ivledev-vip.nus.edu.sg//api/Lapi.svc/"; //dev
//const SERVER_URL = "https://ivle.nus.edu.sg//api/Lapi.svc/";

var selectedCourseID = "";
var selectedWorkbinFolders = "";
var selectedForumList = "";
var selectedHeadingsID = "";
var currentDiv = null;

class IVLEEventUtil

{

	static get_modules() {
		//gets all the modules tagged to the account
		$("#divLoading").show();
		let url = SERVER_URL + "Modules?APIKey=" + LAPI_KEY + "&AuthToken=" + LocalStorageUtil.getItem("API_TOKEN") + "&IncludeAllInfo=true";

		let data = {};

		let fnSuccess = function (data) {
			let results = data.Results;
			var i = 0;
			var moduleListHTML = "";
			while (i < results.length) {
				moduleListHTML += '<li onclick="IVLEEventUtil.show_module_details(\'' + results[i].CourseCode + '\',\'' + results[i].ID + '\')"><h1>' + results[i].CourseCode + '</h1><p>' + results[i].CourseName +
					'</p><p>' + results[i].CourseAcadYear + '</p><p>Owner: </p></li>';
				i++;
			}
			$("#ulModuleList").html(moduleListHTML);
			$("#divLoading").hide();
			$("#divModuleList").show();

		};
		var fnError = function (data) {
			alert(data);
		};

		HTTPUtil.get(url, data, fnSuccess, fnError);
	}


	static show_module_details(CourseCode, CourseID) {
		//show module details
		selectedCourseID = CourseID;
		$("#divLoading").show('fade');
		let url = SERVER_URL + "Module_Information?APIKey=" + LAPI_KEY + "&AuthToken=" + LocalStorageUtil.getItem("API_TOKEN") + "&CourseID=" + CourseID + "&Duration=0";
		let data = {};

		let fnSuccess = function () {
			$("#h1ModuleInfoTitle").text(CourseCode);
			$("#divModuleInfo").show('fade');
			currentDiv = $("#divModuleInfo");
			$("#divHomePage").hide();
			$("#divLoading").hide();

		};

		var fnError = function () {
			alert("error");
			$("#divLoading").hide();
		};

		HTTPUtil.get(url, data, fnSuccess, fnError);
		IVLEEventUtil.show_module_course_outline();
		IVLEEventUtil.get_module_class_roster();
	}

	static show_module_course_outline() {
		$("#divLoading").show();
		let url = SERVER_URL + "Module_Information?APIKey=" + LAPI_KEY + "&AuthToken=" + LocalStorageUtil.getItem("API_TOKEN") + "&CourseID=" + selectedCourseID + "&Duration=0";
		let data = {};
		$("#divModuleInfoCourseDetails").empty();

		let fnSuccess = function (data) {
			let results = data.Results;
			$("#h1ModuleCourseOutlineTitle").text("Course Overview");
			var i = 0;
			while (i < results.length) {
				try {
					let moduleInfoListHTML = '<li><h1>' + results[i].Title + '</h1>' + results[i].Description + '</li>';
					console.log(moduleInfoListHTML);
					moduleInfoListHTML.replace("src=\"/v1/", "src=\"https://ivle.nus.edu.sg/v1/");
					console.log(moduleInfoListHTML);
					$("#divModuleInfoCourseDetails").append(moduleInfoListHTML);
					i++;
				} catch (error) {
					console.log("error");
					i++;
				}
			}
			$("#divLoading").hide();
		};

		let fnError = function () {
			alert("error");
			$("#divLoading").hide();
		};

		HTTPUtil.get(url, data, fnSuccess, fnError);
	}

	static get_module_class_roster() {
		$("#divLoading").show();
		let url = SERVER_URL + "Class_Roster?APIKey=" + LAPI_KEY + "&AuthToken=" + LocalStorageUtil.getItem("API_TOKEN") + "&CourseID=" + selectedCourseID;
		console.log(url);
		let data = {};
		$("#divModuleInfoCourseDetails").empty();

		let fnSuccess = function (data) {
			let results = data.Results;
			console.log(results);
//			$("#h1ModuleCourseOutlineTitle").text("Course Overview");
//			var i = 0;
//			while (i < results.length) {
//				try {
//					let moduleInfoListHTML = '<li><h1>' + results[i].Title + '</h1>' + results[i].Description + '</li>';
//					console.log(moduleInfoListHTML);
//					moduleInfoListHTML.replace("src=\"/v1/", "src=\"https://ivle.nus.edu.sg/v1/");
//					console.log(moduleInfoListHTML);
//					$("#divModuleInfoCourseDetails").append(moduleInfoListHTML);
//					i++;
//				} catch (error) {
//					console.log("error");
//					i++;
//				}
//			}
			$("#divLoading").hide();
		};

		let fnError = function () {
			alert("error");
			$("#divLoading").hide();
		};

		HTTPUtil.get(url, data, fnSuccess, fnError);
	}





	static show_module_announcements() {
		$("#divLoading").show('fade');
		let url = SERVER_URL + "Announcements?APIKey=" + LAPI_KEY + "&AuthToken=" + LocalStorageUtil.getItem("API_TOKEN") + "&CourseID=" + selectedCourseID + "&Duration=0&TitleOnly=false";
		let data = {};

		let fnSuccess = function (data) {
			let results = data.Results;
			console.log(results);
			var moduleInfoAnnouncementHTML = "";
			var i = 0;
			if (results.length === 0) {
				moduleInfoAnnouncementHTML += '<li><h1>No Announcements</h1></li>';
			} else {
				while (i < results.length) {
					let postDate = new Date(results[i].CreatedDate_js);
					moduleInfoAnnouncementHTML += '<li class="list-group-item announcement"><h1>' + results[i].Title + '</h1>' + results[i].Description +
						'<div><img src="../IVLE/image/icon_clock.png"/><p>' +
						postDate.toLocaleString() + '</p></div></li>';
					i++;
				}
			}
			$("#ulModuleAnnouncementList").html(moduleInfoAnnouncementHTML);
			$("#divModuleAnnouncements").show('fade');
			currentDiv = $("#divModuleAnnouncements");
			$("#divModuleInfo").hide();
			$("#buttonNewAnnouncement").click(function () {
				var modalHTML = '<div class="form-group">\n' +
					'    <label>Title</label>\n' +
					'    <input id="inputAnnouncementTitle" type="text" value="" class="form-control"placeholder="Title">\n' +
					'  </div>\n' +
					'  <div class="form-group">\n' +
					'    <label>Message</label>\n' +
					'    <input id="inputAnnouncementMessage" type="text" class="form-control" placeholder="Message">\n' +
					'  </div>\n' +
					'  <button onclick="IVLEEventUtil.announcement_post_new()" class="btn btn-primary">Submit</button>\n';

				$("#h5ModalTitle").text("New Announcement");
				$("#divModalBody").html(modalHTML);
				$("#ModalCenter").modal("show");
			});
			$("#divLoading").hide();
		};
		var fnError = function () {
			alert("error");
			$("#divLoading").hide();
		};

		HTTPUtil.get(url, data, fnSuccess, fnError);
	}

	static announcement_post_new() {
		$("#divLoading").show('fade');
		let url = SERVER_URL + "Announcement_Add";
		let data = {};
		data.APIKEY = LAPI_KEY;
		data.AuthToken = LocalStorageUtil.getItem("API_TOKEN");
		data.CourseID = selectedCourseID;
		data.AnnTitle = document.getElementById("inputAnnouncementTitle").value;
		data.AnnMessage = document.getElementById("inputAnnouncementMessage").value;
		data.SendEmail = "Y";
		if (data.AnnTitle === undefined || data.AnnTitle === null || data.AnnTitle === "" || data.AnnMessage === "" || data.AnnMessage === undefined || data.AnnMessage === null) {
			alert("Pls input value");
			return false;
		}

		let fnSuccess = function () {
			$("#ModalCenter").modal("hide");
			$("#divModalBody").html("");
			IVLEEventUtil.show_module_announcements();
			$("#divLoading").hide();
		};
		var fnError = function () {
			alert("error");
			$("#divLoading").hide();
		};

		HTTPUtil.ajax(url, data, fnSuccess, fnError);
	}

	static show_module_workbin() {
		$("#divLoading").show('fade');
		let url = SERVER_URL + "Workbins?APIKey=" + LAPI_KEY + "&AuthToken=" + LocalStorageUtil.getItem("API_TOKEN") + "&CourseID=" + selectedCourseID + "&Duration=0&TitleOnly=false";
		let data = {};

		let fnSuccess = function (data) {

			let results = data.Results[0].Folders;
			selectedWorkbinFolders = results;
			console.log(results);
			$("#h1AnnouncementsTitle").text("Workbin Files");
			var moduleInfoWorkbinHTML = "";
			var i = 0;
			while (i < results.length) {
				moduleInfoWorkbinHTML += '<li class="list-group-item" onclick="IVLEEventUtil.show_module_workbin_files(\'' + results[i].FolderOrder + '\')"><h1>' + results[i].FolderName + '</h1><p>No.Of Files: ' + results[i].FileCount + '</p></li>';
				i++;
			}
			$("#ulModuleWorkbinList").html(moduleInfoWorkbinHTML);
			console.log(moduleInfoWorkbinHTML);
			$("#divModuleWorkbin").show('fade');
			currentDiv = $("#divModuleWorkbin");
			$("#divModuleInfo").hide();
			$("#divLoading").hide();
		};
		var fnError = function () {
			alert("error");
			$("#divLoading").hide();
		};

		HTTPUtil.get(url, data, fnSuccess, fnError);
	}

	static show_module_workbin_files(orderID) {
		let folder = selectedWorkbinFolders[orderID - 1];
		if (folder.Files.length === 0) {
			alert("No files");
			$("#divLoading").hide();
			return false;
		}
		$("#h1WorkbinFolderTitle").text(folder.FolderName);
		var workbinFolderFilesHTML = "";
		for (var i = 0; i < folder.Files.length; i++) {
			workbinFolderFilesHTML += '<li class="list-group-item" onclick="IVLEEventUtil.download_workbin_file(\'' + folder.Files[i].ID + '\')"><h1>' + folder.Files[i].FileName + '</li>';
		}
		$("#ulModuleWorkbinFolderList").html(workbinFolderFilesHTML);
		$("#divModuleWorkbinFolder").show('fade');
		currentDiv = $("#divModuleWorkbinFolder");
		$("#divModuleWorkbin").hide();
		$("#divLoading").hide();
	}

	static download_workbin_file(fileID) {
		console.log(fileID);
		let url = "https://ivle.nus.edu.sg/api/downloadfile.ashx?APIKey=" + LAPI_KEY + "&AuthToken=" + LocalStorageUtil.getItem("API_TOKEN") + "&ID=" + fileID + "&target=workbin";
		window.open(url, '_system', 'location=no');
	}

	static show_module_media_folder() {
		$("#divLoading").show('fade');
		let url = SERVER_URL + "Multimedia?APIKey=" + LAPI_KEY + "&AuthToken=" + LocalStorageUtil.getItem("API_TOKEN") + "&CourseID=" + selectedCourseID + "&TitleOnly=false";
		let data = {};

		let fnSuccess = function (data) {
			if (data.Results.length === 0) {
				alert("No Media Files Available For Viewing");
				return false;
			}
			let results = data.Results;
			console.log(results);
			var moduleMediaFolderListHTML = "";
			var i = 0;
			while (i < results.length) {
				moduleMediaFolderListHTML += '<li class="list-group-item" onclick="IVLEEventUtil.show_module_media_folder_contents(\'' + results[i].ID + '\')"><h1>' + results[i].Title + '</h1><p>No.Of Files: ' + results[i].Files.length + '</p></li>';
				i++;
			}
			$("#ulModuleMultiMediaFolderList").html(moduleMediaFolderListHTML);
			$("#divModuleMultiMediaFolder").show('fade');
			currentDiv = $("#divModuleMultiMediaFolder");
			$("#divModuleInfo").hide();
			$("#divLoading").hide();
		};
		var fnError = function () {
			alert("error");
			$("#divLoading").hide();
		};

		HTTPUtil.get(url, data, fnSuccess, fnError);
	}

	static show_module_media_folder_contents(mediaFolderID) {
		$("#divLoading").show('fade');
		let url = SERVER_URL + "Multimedia?APIKey=" + LAPI_KEY + "&AuthToken=" + LocalStorageUtil.getItem("API_TOKEN") + "&CourseID=" + selectedCourseID + "&Duration=0&MediaChannelID=" + mediaFolderID + "&TitleOnly=false";
		let data = {};

		let fnSuccess = function (data) {
			let results = data.Results[0].Files;
			if (results.length === 0) {
				alert("No media available");
				$("#divLoading").hide();
				return false;
			}
			console.log(results);
			$("#h1MultiMediaFolderContentTitle").text(data.Results[0].Title);
			var moduleMediaFolderContentListHTML = "";
			var i = 0;
			while (i < results.length) {
				let description = results[i].FileDescription !== "" ? results[i].FileDescription : "No description.";
				moduleMediaFolderContentListHTML += '<li class="list-group-item" onclick="IVLEEventUtil.stream_multimedia_content(\'' + results[i].BankCatID + '\', \'' + results[i].FileName + '\')"><h1>' + results[i].FileTitle + '</h1><p>' + description + '</p></li>';
				i++;
			}
			$("#ulModuleMultiMediaFolderContentList").html(moduleMediaFolderContentListHTML);
			$("#divModuleMultiMediaFolderContent").show('fade');
			currentDiv = $("#divModuleMultiMediaFolderContent");
			$("#divModuleMultiMediaFolder").hide();
			$("#divLoading").hide();
		};
		var fnError = function (data) {
			alert(data);
			$("#divLoading").hide();
		};

		HTTPUtil.get(url, data, fnSuccess, fnError);
	}

	static stream_multimedia_content(BankCatID, FileName) {
		let videoURL = "https://vod.nus.edu.sg/hls-vod/ivle/users/" + BankCatID + "/" + FileName.replace(/ /g, "%20") + ".m3u8";
		window.open(videoURL, '_system', 'location=no');
	}

	static show_module_forum() {
		$("#divLoading").show('fade');
		let url = SERVER_URL + "Forums?APIKey=" + LAPI_KEY + "&AuthToken=" + LocalStorageUtil.getItem("API_TOKEN") + "&CourseID=" + selectedCourseID + "&TitleOnly=false";
		let data = {};

		let fnSuccess = function (data) {
			let results = data.Results;
			selectedForumList = results;
			console.log(results);
			var moduleForumListHTML = "";
			var i = 0;
			while (i < results.length) {
				moduleForumListHTML += '<li onclick="IVLEEventUtil.show_module_forum_headers_selection_modal(\'' + i + '\')"><h1>' + results[i].Title + '</h1><span class="badge badge-light">' + results[i].BadgeTool + '</span></li>';
				i++;
			}
			$("#ulModuleForumList").html(moduleForumListHTML);
			$("#divModuleForumList").show('fade');
			currentDiv = $("#divModuleForumList");
			$("#divModuleInfo").hide();
			$("#divLoading").hide();
		};
		var fnError = function () {
			alert("error");
			$("#divLoading").hide();
		};

		HTTPUtil.get(url, data, fnSuccess, fnError);
	}

	static show_module_forum_headers_selection_modal(index) {
		console.log(index);
		let forumHeadings = selectedForumList[index].Headings;
		var i = 0;
		var moduleForumHeadingsHTML = "";
		while (i < forumHeadings.length) {
			moduleForumHeadingsHTML += '<li onclick="IVLEEventUtil.show_module_forum_headings_thread_list(\'' + forumHeadings[i].ID + '\')" class="list-group-item">' + forumHeadings[i].Title + '</li>';
			i++;
		}
		let modalHTML = '<ul class="list-group">' + moduleForumHeadingsHTML + '</ul>';
		$("#h5ModalTitle").text("Select Forum Heading");
		$("#divModalBody").html(modalHTML);
		$("#ModalCenter").modal("show");
	}

	static show_module_forum_headings_thread_list(headingsID) {
		console.log(headingsID);
		selectedHeadingsID = headingsID;
		$("#ModalCenter").modal("hide");
		$("#divLoading").show('fade');
		let url = SERVER_URL + "Forum_HeadingThreads?APIKey=" + LAPI_KEY + "&AuthToken=" + LocalStorageUtil.getItem("API_TOKEN") + "&HeadingID=" + headingsID + "&Duration=262800";
		let data = {};

		let fnSuccess = function (data) {
			let results = data.Results;
			console.log(results);
			var moduleForumHeaderListHTML = "";
			var i = 0;
			if (results.length === 0) {
				moduleForumHeaderListHTML = '<li class="list-group-item"><h1>No Posts</h1>';
			} else {
				let postDate = new Date(results[i].PostDate_js);
				let posterInfoHTML = '<div style="float:left"><p>' + results[i].Poster.Name + '</p><p>' + postDate.toLocaleString() + '</p></div>';
				while (i < results.length) {
					moduleForumHeaderListHTML += '<li class="list-group-item"><h1>' + results[i].PostTitle + '</h1><p>' + results[i].PostBody + '</p>' + posterInfoHTML +
						'<div style="float:right"><button onclick="IVLEEventUtil.show_forum_reply_to_thread_modal(\'' + results[i].ID + '\',\'' + results[i].PostTitle + '\') "class="btn reply-button"></button></div></li>';
					i++;
				}
			}
			$("#ulModuleForumHeadingsThreadList").html(moduleForumHeaderListHTML);
			$("#divModuleForumHeadingsThreadList").show('fade');
			$("#divModuleForumList").hide();
			$("#buttonNewThread").click(function () {
				var modalHTML = '<div class="form-group">\n' +
					'    <label>Title</label>\n' +
					'    <input id="inputForumPostTitle" type="text" value="" class="form-control"placeholder="Title">\n' +
					'  </div>\n' +
					'  <div class="form-group">\n' +
					'    <label>Message</label>\n' +
					'    <input id="inputForumPostMessage" type="text" class="form-control" placeholder="Message">\n' +
					'  </div>\n' +
					'  <button onclick="IVLEEventUtil.forum_post_new_thread_under_headings()" class="btn btn-primary">Submit</button>\n';

				$("#h5ModalTitle").text("Post New Thread");
				$("#divModalBody").html(modalHTML);
				$("#ModalCenter").modal("show");
			});
			$("#divLoading").hide();
		};
		var fnError = function () {
			alert("error");
			$("#divLoading").hide();
		};

		HTTPUtil.get(url, data, fnSuccess, fnError);
	}

	static forum_post_new_thread_under_headings() {
		$("#divLoading").show('fade');
		let url = SERVER_URL + "Forum_PostNewThread_JSON";
		let data = {};
		data.APIKEY = LAPI_KEY;
		data.AuthToken = LocalStorageUtil.getItem("API_TOKEN");
		data.HeadingID = selectedHeadingsID;
		data.Title = document.getElementById("inputForumPostTitle").value;
		data.Reply = document.getElementById("inputForumPostMessage").value;
		if (data.Title === undefined || data.Title === null || data.Title === "" || data.Reply === "" || data.Reply === undefined || data.Reply === null) {
			alert("Pls input value");
			return false;
		}

		let fnSuccess = function () {
			$("#ModalCenter").modal("hide");
			$("#divModalBody").html("");
			IVLEEventUtil.show_module_forum_headings_thread_list(selectedHeadingsID);
			$("#divLoading").hide();
		};
		var fnError = function () {
			alert("error");
			$("#divLoading").hide();
		};

		HTTPUtil.ajax(url, data, fnSuccess, fnError);
	}

	static show_forum_reply_to_thread_modal(threadID, postTitle) {
		console.log(threadID);
		console.log(postTitle);
		let title = 'RE: ' + postTitle;

		//set the html for modal popup
		var modalHTML = '<div class="form-group">\n' +
			'    <label>Title</label>\n' +
			'    <input id="inputForumPostTitle" type="text" value=\'' + title + '\' class="form-control"placeholder="Title">\n' +
			'  </div>\n' +
			'  <div class="form-group">\n' +
			'    <label>Message</label>\n' +
			'    <input id="inputForumPostMessage" type="text" class="form-control" placeholder="Message">\n' +
			'  </div>\n' +
			'  <button onclick="IVLEEventUtil.forum_reply_to_thread(\'' + threadID + '\')" class="btn btn-primary">Submit</button>\n';

		$("#h5ModalTitle").text("Reply to Thread");
		$("#divModalBody").html(modalHTML);
		$("#ModalCenter").modal("show");
	}

	static forum_reply_to_thread(threadID) {
		$("#divLoading").show('fade');
		let url = SERVER_URL + "Forum_ReplyThread_JSON";
		let data = {};
		data.APIKEY = LAPI_KEY;
		data.AuthToken = LocalStorageUtil.getItem("API_TOKEN");
		data.ThreadID = threadID;
		data.Title = document.getElementById("inputForumPostTitle").value;
		data.Reply = document.getElementById("inputForumPostMessage").value;
		if (data.Title === undefined || data.Title === null || data.Title === "" || data.Reply === "" || data.Reply === undefined || data.Reply === null) {
			alert("Pls input value");
			return false;
		}

		let fnSuccess = function () {
			$("#ModalCenter").modal("hide");
			$("#divModalBody").html("");
			IVLEEventUtil.show_module_forum_headings_thread_list(selectedHeadingsID);
			$("#divLoading").hide();
		};
		var fnError = function () {
			alert("error");
			$("#divLoading").hide();
		};

		HTTPUtil.ajax(url, data, fnSuccess, fnError);
	}

	static token_validate() {
		let url = SERVER_URL + "Validate?APIKey=" + LAPI_KEY + "&Token=" + LocalStorageUtil.getItem("API_TOKEN");
		let profileUrl = SERVER_URL + "Profile_View?APIKey=" + LAPI_KEY + "&AuthToken=" + LocalStorageUtil.getItem("API_TOKEN");
		let data = {};

		let fnSuccess = function (data) {
			if (data.Token !== null || data.Token !== "") {
				LocalStorageUtil.setItem("API_TOKEN", data.Token);
			}
			IVLEEventUtil.get_modules();
		};
		var fnError = function () {
			alert("Pls Login");

		};

		let fnSuccessProfile = function (data) {
			if (data.Results[0].FirstMajor !== "" && data.Results[0].MatriculationYear !== "N") {
				LocalStorageUtil.setItem("ACC_TYPE", "STU");
				IVLEEventUtil.show_stf_controls(false);
			} else {
				LocalStorageUtil.setItem("ACC_TYPE", "STF");
				IVLEEventUtil.show_stf_controls(true);
			}
		};
		var fnErrorfnSuccessProfile = function () {
			alert("Unable To Get Profile");

		};

		HTTPUtil.get(url, data, fnSuccess, fnError);
		HTTPUtil.get(profileUrl, data, fnSuccessProfile, fnErrorfnSuccessProfile);
	}

	static show_stf_controls(isShow) {
		//set the user type based on the profile. If there is no first major or matriculation year == staff
		if (isShow) {
			$("#buttonNewAnnouncement").show();
		} else {
			$("#buttonNewAnnouncement").hide();
		}

	}


	static logout() {
		localStorage.clear();
		window.location.reload();
	}

	static return_to_home_page() {
		$("#divModuleInfo").hide();
		$("#divModuleCourseOutline").hide();
		$("#divModuleAnnouncements").hide();
		$("#divModuleWorkbin").hide();
		$("#divModuleWorkbinFolder").hide();
		$("#divModuleMultiMediaFolder").hide();
		$("#divModuleMultiMediaFolderContent").hide();
		$("#divModuleForumList").hide();
		$("#divModuleForumHeadingsThreadList").hide();
		$("#divHomePage").show('fade');
	}
}
