// 🌐 GLOBAL CENTRALIZED ROUTING HUB
export const navigationHub = {
  // Yeh pointers memory mein save rahenge aur main pages se connect ho jayenge
  setActivePagePointer: null,
  setHistoryTabPointer: null,

  /**
   * 🚀 CENTRALIZED REDIRECT ENGINE
   * @param {string} targetPage - Kis page par jaana hai ('home', 'wallet', 'history', etc.)
   * @param {string} subFilter - (Optional) Agar koi specific tab ya filter kholna ho
   */
  redirect: function (targetPage, subFilter = null) {
    // 1. Agar target page badalna hai, toh direct master redirect lagao
    if (this.setActivePagePointer) {
      this.setActivePagePointer(targetPage);
    } else {
      console.log("Navigation Hub Error: Main App Router not registered yet.");
    }

    // 2. Agar sath mein koi specific sub-filter (jaise withdrawals) manga hai
    if (subFilter && this.setHistoryTabPointer) {
      // Chota sa delay taaki pehle page load ho jaye, fir filter trigger ho
      setTimeout(() => {
        if (this.setHistoryTabPointer) {
          this.setHistoryTabPointer(subFilter);
        }
      }, 50);
    }
  }
};
