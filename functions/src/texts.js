const texts = {
  bubble(e){
    switch (e) {
      case 'Welcome':
        return '';
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
      default:

    }
  }

}
module.exports = texts
