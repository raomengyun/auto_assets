import 'package:flutter/widgets.dart';

class AssetImages {
  AssetImages._();
  
  /// Assets for loginIconLastLogin
  /// login/3x/icon_last_login, login/2x/icon_last_login
  static AssetImage _loginIconLastLogin() =>
    const AssetImage('login/icon_last_login.png');
  static AssetImage get loginIconLastLogin => _loginIconLastLogin();

  /// Assets for loginIconPassword
  /// login/3x/icon_password, login/2x/icon_password
  static AssetImage _loginIconPassword() =>
    const AssetImage('login/icon_password.png');
  static AssetImage get loginIconPassword => _loginIconPassword();

  /// Assets for loginIconPhone
  /// login/3x/icon_phone, login/2x/icon_phone
  static AssetImage _loginIconPhone() =>
    const AssetImage('login/icon_phone.png');
  static AssetImage get loginIconPhone => _loginIconPhone();

  /// Assets for loginIconSelected
  /// login/3x/icon_selected, login/2x/icon_selected
  static AssetImage _loginIconSelected() =>
    const AssetImage('login/icon_selected.png');
  static AssetImage get loginIconSelected => _loginIconSelected();

  /// Assets for loginTopShadow
  /// login/3x/top_shadow, login/2x/top_shadow
  static AssetImage _loginTopShadow() =>
    const AssetImage('login/top_shadow.png');
  static AssetImage get loginTopShadow => _loginTopShadow();

  /// Assets for loginIconUnselected
  /// login/2x/icon_unselected
  static AssetImage _loginIconUnselected() =>
    const AssetImage('login/icon_unselected.png');
  static AssetImage get loginIconUnselected => _loginIconUnselected();

  /// Assets for commonIconClose
  /// common/3x/icon_close, common/2x/icon_close
  static AssetImage _commonIconClose() =>
    const AssetImage('common/icon_close.png');
  static AssetImage get commonIconClose => _commonIconClose();
}