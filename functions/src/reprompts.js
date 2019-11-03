const reprompts = {
  getURL(e) {
    const valmis = '100K';
    switch (e) {
      case 'Welcome':
        return ['100K','DefaultWelcomeIntent-followup','1_1event','ready'];
      case '1_1event':
        return ['199K','int1_1','1_2event','ready'];
      case '1_2event':
        return ['102K','int1_2','1_3event','one'];
      case '1_3event':
        return ['104K','int1_3','1_4event','one'];
      case '1_4event':
        return ['107K','int1_4','1_5event','ready'];
      case '1_5event':
        return ['109K','int1_5','1_6event','two'];
      case '1_6event':
        return ['110K','int1_6','1_7event','one'];
	     case '1_7event':
		     return ['111K','int1_7','2_1event','one'];
      case '2_2event':
        return ['117K','int2_2','2_3event','two'];
      case '2_3event':
        return ['121K','int2_3','2_4event','one'];
      case '2_4event':
        return ['123K','int2_4','2_5event','two'];
      case '3A_1event':
        return ['124K','int3A_1','3A_2event','one'];
      case '3A_3event':
        return [valmis,'int3A_W','3A_4event','ready'];
      case '3A_4event':
        return [valmis,'int3A_4','3D_1event','ready'];
      case '3B_Eevent':
        return ['134K','int3B_E','3B_1event','one'];
      case '3B_1event':
        return [valmis,'int3B_1','3B_2event','ready'];
      case '3B_2event':
        return [valmis,'int3B_2','3B_3event','ready'];
      case '3B_3event':
        return ['138K','int3B_3','3B_4event','ready'];
      case '3B_4event':
        return [valmis,'int4_E','4_1event','ready'];
      case '3D_1event':
        return ['130K','int3D_1','3D_2event',1];
      case '3D_2event':
        return ['131K','int3D_2','3D_3event',1];
      case '3D_3event':
        return ['132K','int3D_3','3D_4event',1];
      case '3D_4event':
        return ['133K','int3D_4','3D_5event','two'];
      case '3D_5event':
        return [valmis,'int4_E','4_1event','ready'];
      case '5A_1event':
        return ['141K','int5A_1','5A_2event','professor'];
      case '5A_2event':
        return ['142K','int5A_2','5A_3event','ready'];
      case '5B_1event':
        return ['144K','int5B_1','5B_2event','no'];
      case '5B_2event':
        return ['147K','int5B_2','5B_3event','no'];
      case '5C_1event':
        return ['152K','int5C_1','5C_2event','one'];
      case '6_1event':
        return ['157K','int6_1','7_1event','one'];
      case '9_1event':
        return ['203K','int9_1','9_2event','ready'];
      case '9_2event':
        return ['204K','int9_2','9_3event','yes'];
      case '9_3event':
        return [valmis,'int9_3','9_4event','ready'];
      case '9_4event':
        return [valmis,'int9_4','10_1event','ready'];
      case '11A_1event':
        return ['214K','int11A_1','11A_2event','yes'];
      case '11A_2event':
        return ['215K','int11A_2','11A_3event','no'];
      case '11B_1event':
        return ['220K','int11B_1','11B_2event','one'];
      case '11C_1event':
        return ['227K','int11C_1','11C_2event','one'];
      case '11C_2event':
        return ['230K','int11C_2','11C_3event','one'];
      case '12_1event':
        return ['240K','int12_1','12_2event','no'];
      case '12_2event':
        return [valmis,'int12_2','12_3event','ready'];
      case '12_3event':
        return [valmis,'int12_3','12_4event','ready'];
      case '12_4event':
        return ['244K','int12_4','12_5event','two'];
        //TODO PROPERLY WHICH CONTEXT
      case '12_5event':
        return [valmis,'int12_5','12_6event','ready'];
      case '12_6event':
        return ['247K','int12_6','12_7event','one'];
      case '12_7event':
        return [valmis,'int13_E','13_1event','ready'];
      case '13_1event':
        return ['250K','int13_1','13_2event','no'];
      case '13_2event':
        return [valmis,'int13_2','14_1event','ready'];
      case '14_2event':
        return ['301K','int15_1','15_2event','yes'];
      case '15_1event':
      return ['301K','int15_1','15_2event','yes'];
      case '15_2event':
      return ['303K','int15_2','15_3event','yes'];
      case '15_3event':
      return ['304K','int15_3','15_4event','no'];
      case '15_4event':
      return ['305K','int15_4','15_5event','no'];
      case '15_5event':
      return ['306K','int16_1','16_2event','one'];
      case '16_1event':
      return ['306K','int16_1','16_2event','one'];
      case '16_2event':
      return [valmis,'int16_2','17_1event','ready'];
      case '17_1event':
      return ['311K','int17_1','17_2event','ready'];
      case '17_2event':
      return [valmis,'int17_2','17_3event','one'];
      case '17_3event':
      return [valmis,'int18_E','18_1Aevent','ready'];
      case '17_4Bevent':
      return [valmis,'int18_E','18_1Aevent','ready'];
      case '18_1event':
      return ['319K','int18_1','18_2event','one'];
      case '18_2event':
      return ['','int18_2','18_3event','ready'];
      case '18_3event':
      return [valmis,'int18_3','18_4event','ready'];
      case '18_4event':
      return [valmis,'int18_4','19_1event','ready'];
      case '19_1event':
      return ['401K','int19_1','19_2event','ready'];
      case '19_2event':
      return ['402K','int19_2','19_3event','one'];
      case '19_3event':
      return ['404K','int19_3','20_1event','ready'];
      case '20_1event':
      return ['406K','int20_1','20_2event','two'];
      case '20_2event':
      return ['407K','int20_2','20_3event','two'];
      case '20_3event':
      return [valmis,'int20_3','21_1event','ready'];
      case '21_1event':
      return ['411K','int21_1','21_2event','two'];
      case '21_2event':
      return ['412K','int21_2','21_3event','two'];
      case '22A_1event':
      return ['418K','int22A_1','22A_2event','ready'];
      case '22A_2event':
      return ['419K','int22A_2','22A_3event','ready'];
      case '22A_3event':
      return [valmis,'int22A_3','22B_1event','ready'];
      case '22B_1event':
      return ['421K','int22B_1','22B_2event','rolf rivasto'];
      case '22B_2event':
      return [valmis,'int23_E','23_1event','ready'];
      case '22D_1event':
      return ['423K','int22D_1','22D_2event','ready'];
      case '22D_2event':
      return [valmis,'int22D_2','22D_3event','ready'];
      case '22D_3event':
      return [valmis,'int23_E','23_1event','ready'];
      case '23_1event':
      return ['427K','int23_1','23_2event','three'];
      case '23_2event':
      return [valmis,'int23_2','24_1event','ready'];
      case '24_5event':
      return [valmis,'int24_5','25_1event','ready'];
      case '24_1event':
      return ['430K','int24_1','24_2event','one'];
      case '25_1event':
      return ['441K','int25_1','25_2event','one'];
      case '25_2event':
      return ['442K','int25_2','25_3event','one'];
      case '25_3event':
      return [valmis,'int25_3','25_4event','ready'];
      case '25_4event':
      return ['446K','int25_4','25_5event','one'];
      case '26Aevent':
      return [valmis, 'int25A','26Aevent','ready'];
      case '26Bevent':
      return [valmis, 'int25B','26Bevent','ready'];
      default:
      return ['repeater','int5','1_5event','one'];
    }
  },
  getParam(e) {
    switch (e) {
      case 'XX_Xevent':
        return 'XX_specialparam'; //ESIM BINARR
      default: {
        const indx = e.indexOf('event');
        if (indx !== -1) {
          return 'ent' + e.slice(0,indx);
        } else {
          return 'response';
        }
      }
    }
  },
  getType(e) {
    switch (e) {
      case 'yes':
      return 'binarr';
      case 'no':
      return 'binarr';
      default:
      return 'response';
    }
  }
}
module.exports = reprompts
